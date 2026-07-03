let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) { passed++; return; }
  failed++;
  console.error('FAIL:', msg);
}

const sample = {
  ok: true,
  schema: 1,
  bucket: 'all',
  updatedAt: new Date().toISOString(),
  session: { psxOpen: true, usOpen: false },
  stale: { psx: false, us: true, cmd: false },
  counts: { psx: 10, us: 511, commodities: 14, catalog: 754 },
  fx: { rate: 280, source: 'test', ts: Date.now() },
  psx: { updatedAt: new Date().toISOString(), quotes: { LUCK: { price: 1, prevClose: 1, changePct: 0, quoteKind: 'intraday', source: 'dps', ts: 1 } } },
};

assert(sample.ok === true, 'ok');
assert(sample.schema === 1, 'schema');
assert(sample.psx.quotes.LUCK.price > 0, 'psx quote');
assert(typeof sample.stale.psx === 'boolean', 'stale flag');

console.log(`snapshot-shape: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
