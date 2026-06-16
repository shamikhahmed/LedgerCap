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

## Test the proxy

```bash
curl "https://ledgercap-psx-proxy.<your-subdomain>.workers.dev?url=https%3A%2F%2Fdps.psx.com.pk%2Flive" | head -c 500
```

You should get JSON (PSX live data), not an HTML error page.
