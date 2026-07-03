# LedgerCap PSX Price Proxy

Fetches PSX data server-side so the LedgerCap PWA avoids CORS blocks.

## Deploy (one-time)

### 1. Go to the worker folder

```bash
cd LedgerCap/worker   # from your workspace root
```

### 2. Log in to Cloudflare

```bash
npx wrangler login
```

This opens a browser to authorize Wrangler. You need a free Cloudflare account.

### 3. Register workers.dev subdomain (first time only)

Cloudflare needs a free subdomain before your worker gets a public URL.

**Option A — in terminal (easiest):**

```bash
npx wrangler deploy
```

When asked `Would you like to register a workers.dev subdomain now?` answer **`yes`**.

Pick something like `shamikhahmed` → your workers live at `*.shamikhahmed.workers.dev`.

**Option B — in browser:**

Open your Cloudflare Workers onboarding page, then run `npx wrangler deploy` again.

### 4. Deploy

```bash
npx wrangler deploy
```

On success you'll see something like:

```
Published ledgercap-psx-proxy (X.XX sec)
  https://ledgercap-psx-proxy.<your-subdomain>.workers.dev
```

### 5. Paste URL into LedgerCap

Open the app → **Settings** → **PSX Proxy URL** → paste the Workers URL → **Save Proxy URL**.

Or edit `js/data/config.js`:

```js
window.LEDGERCAP_CONFIG = {
  psxProxyUrl: 'https://ledgercap-psx-proxy.<your-subdomain>.workers.dev',
};
```

Then commit/push if you want it baked into the deployed site.

## Troubleshooting

| Error | Fix |
|-------|-----|
| `cd: no such file or directory: LedgerCap/worker` | `cd` from workspace root into `LedgerCap/worker` |
| Permission error on `~/.Trash` | Run deploy **from** the `worker/` folder (not `~`). |
| `register a workers.dev subdomain` | Answer **yes** when prompted, or use the Workers onboarding link above. |
| `CLOUDFLARE_API_TOKEN` required | Run `npx wrangler login` first |

## Price snapshot KV (v3.55+)

```bash
npx wrangler kv namespace create PRICE_CACHE
# paste id into wrangler.toml [[kv_namespaces]]
npx wrangler deploy
```

- `GET /prices/snapshot?bucket=all|psx|us|commodities|fx|meta`
- Cron reuses existing Telegram schedules (no extra cron quota): catalog at 09:00 PKT, PSX batches during session, US 511 during NY, commodities + FX
- Edit OGRA fallback: `worker/data/ogra-fallback.json`
- Rollback: `SKIP_PRICE_CRON=1` in wrangler vars; client Settings → disable Market snapshot

```bash
curl "https://ledgercap-psx-proxy.<subdomain>.workers.dev/prices/snapshot?bucket=meta"
```

## Test the proxy

```bash
curl "https://ledgercap-psx-proxy.<your-subdomain>.workers.dev/timeseries/eod/KSE100" | head -c 500
```

Or health check:

```bash
curl "https://ledgercap-psx-proxy.<your-subdomain>.workers.dev/health"
```

Legacy `/live` path redirects to KSE-100 EOD timeseries (PSX removed the bare `/live` endpoint).

## Telegram morning brief (background)

Weekday **9:00 PKT** briefs while the PWA is closed:

1. `npx wrangler kv namespace create TELEGRAM_BRIEF` — uncomment KV block in `wrangler.toml`
2. `npx wrangler secret put TELEGRAM_BOT_TOKEN` (from @BotFather — never commit)
3. `npx wrangler secret put TELEGRAM_CHAT_ID` (numeric — use app **Detect chat ID**)
4. `npx wrangler secret put TELEGRAM_SYNC_KEY` (same as Settings → Telegram → Cloud sync key)
5. `npx wrangler deploy`

In the app: message [@LedgerCap_Bot](https://t.me/LedgerCap_Bot), enable **Cloud brief sync**, tap **Sync brief to cloud**.

Check: `GET …/telegram/ping`

## Pakistan — Telegram Bot API proxy

`api.telegram.org` is often blocked from Pakistani ISPs. The PWA **never calls it directly** when a proxy URL is set (default: LedgerCap worker).

```
Browser (PK) → ledgercap-psx-proxy.workers.dev/telegram/bot/sendMessage
            → Cloudflare edge → api.telegram.org → your phone
```

After code changes, redeploy:

```bash
cd LedgerCap/worker && npx wrangler deploy
```

In app: **Settings → Telegram → Test proxy** should show “Proxy OK”.

Optional: `GET …/telegram/ping` returns `{ "proxy": true }`.

## Encrypted cloud ledger backup

Optional full-ledger backup (encrypted — never plaintext on server):

1. Set **Cloud sync key** in Settings → Telegram (match `TELEGRAM_SYNC_KEY` on worker)
2. Deploy worker with `PUT/GET /ledger/backup` route (KV or Durable Object storage)
3. In app: **Settings → Data Management → Push cloud backup** / **Restore from cloud**

Client sends header `X-LedgerCap-Sync-Key` and JSON body `{ payload, updatedAt }` where `payload` is AES-GCM encrypted via `BackupCrypto.encryptWithPassphrase`.

If push returns HTTP 404, redeploy `worker/` after adding the backup route.
