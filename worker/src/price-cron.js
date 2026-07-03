import { pktSessionOpen, usSessionOpen } from './us-session.js';
import { fetchPsxCatalog, fetchAllPsxQuotes } from './psx-universe.js';
import { fetchUsQuotes, getUsSymbolList } from './us-quotes.js';
import { fetchCommoditySnapshot } from './commodity-catalog.js';

/** Map existing wrangler crons → price jobs (no extra cron triggers). */
const CATALOG_CRON = '0 4 * * 1-5';
const PSX_EOD_CRON = '30 10 * * 1-5';
const TICK_CRONS = new Set(['30 4 * * 1-5', '0 5,6,8,9 * * 1-5', '30 7 * * 1-5']);

async function kvPut(kv, key, val) {
  await kv.put(key, typeof val === 'string' ? val : JSON.stringify(val));
}

function cronMode(cron) {
  if (cron === CATALOG_CRON) return 'catalog';
  if (cron === PSX_EOD_CRON) return 'psx_eod';
  if (TICK_CRONS.has(cron)) return 'tick';
  return 'tick';
}

export async function runPriceCron(env, event) {
  const kv = env?.PRICE_CACHE;
  if (!kv) return { ok: false, skipped: true, reason: 'no PRICE_CACHE' };
  if (env.SKIP_PRICE_CRON === '1') return { ok: true, skipped: true };

  const mode = cronMode(event?.cron || '');
  const now = new Date();
  const results = { mode, psx: 0, us: 0, cmd: 0 };

  try {
    if (mode === 'catalog') {
      const { catalog, kmiSymbols } = await fetchPsxCatalog();
      if (catalog.length) {
        await kvPut(kv, 'meta:psx_catalog', catalog);
        await kvPut(kv, 'meta:kmi_symbols', kmiSymbols);
        await kvPut(kv, 'meta:last_run:catalog', now.toISOString());
      }
      const { quotes, fx } = await fetchCommoditySnapshot();
      await kvPut(kv, 'cmd:quotes', quotes);
      await kvPut(kv, 'fx:usdpkr', fx);
      await kvPut(kv, 'meta:last_run:cmd', now.toISOString());
      results.cmd = Object.keys(quotes).length;
      return { ok: true, ...results };
    }

    const sessionOpen = pktSessionOpen(now);
    const usOpen = usSessionOpen(now);

    if (mode === 'psx_eod' || (mode === 'tick' && sessionOpen)) {
      let catalog = await kv.get('meta:psx_catalog', 'json');
      if (!catalog?.length) {
        try {
          const fresh = await fetchPsxCatalog();
          catalog = fresh.catalog;
          await kvPut(kv, 'meta:psx_catalog', catalog);
          await kvPut(kv, 'meta:kmi_symbols', fresh.kmiSymbols);
        } catch (e) {
          await kvPut(kv, 'meta:last_error:psx', { at: now.toISOString(), message: e.message });
        }
      }
      const symbols = (catalog || []).map((c) => c.symbol);
      if (symbols.length) {
        const prev = (await kv.get('psx:quotes', 'json')) || {};
        const batchSize = 120;
        let offset = Number(await kv.get('meta:psx_tick_offset')) || 0;
        if (offset >= symbols.length) offset = 0;
        const rotated = symbols.slice(offset).concat(symbols.slice(0, offset));
        const slice = mode === 'psx_eod' ? symbols : rotated.slice(0, batchSize);
        const quotes = await fetchAllPsxQuotes(slice, mode === 'psx_eod' ? false : sessionOpen);
        const merged = { ...prev, ...quotes };
        await kvPut(kv, 'psx:quotes', merged);
        await kvPut(kv, 'meta:last_run:psx', now.toISOString());
        if (mode === 'tick') await kv.put('meta:psx_tick_offset', String(offset + batchSize));
        else await kv.put('meta:psx_tick_offset', '0');
        results.psx = Object.keys(merged).length;
      }
    }

    if (mode === 'tick' && usOpen && env.SKIP_US_CRON !== '1') {
      const quotes = await fetchUsQuotes(getUsSymbolList());
      const prev = (await kv.get('us:quotes', 'json')) || {};
      const merged = { ...prev, ...quotes };
      await kvPut(kv, 'us:quotes', merged);
      await kvPut(kv, 'meta:last_run:us', now.toISOString());
      results.us = Object.keys(merged).length;
    }

    if (mode === 'tick') {
      const lastCmd = await kv.get('meta:last_run:cmd');
      const cmdAge = lastCmd ? Date.now() - new Date(lastCmd).getTime() : Infinity;
      if (cmdAge > 30 * 60 * 1000) {
        const { quotes, fx } = await fetchCommoditySnapshot();
        await kvPut(kv, 'cmd:quotes', quotes);
        await kvPut(kv, 'fx:usdpkr', fx);
        await kvPut(kv, 'meta:last_run:cmd', now.toISOString());
        results.cmd = Object.keys(quotes).length;
      }
    }

    await kvPut(kv, 'meta:version', { schema: 1, built: '3.55.0' });
    return { ok: true, ...results };
  } catch (e) {
    await kvPut(kv, 'meta:last_error:psx', { at: now.toISOString(), message: e.message || 'cron failed' });
    return { ok: false, error: e.message, ...results };
  }
}
