# LedgerCap — Security Notes

## Local-only data

- Transactions, holdings, net worth, and Zakat inputs are stored in **localStorage** on your device.
- **No brokerage integration** — you enter trades manually. Ledger is source of truth.
- Protect device passcode and `.stunds` export files.

## Network surface

- **PSX proxy (optional):** Settings → PSX Proxy URL calls a Cloudflare Worker you configure for public price feeds only. No portfolio data is sent — only symbol lookups.
- Works offline with last-known or manually entered NAV/prices.

## Investment disclaimer

- LedgerCap is **not investment advice**. Projections, Zakat estimates, and net-worth charts are educational tools.
- **Zakat figures are estimates** — consult a qualified Islamic scholar for religious obligations.
- IPO subscribe/list workflows are record-keeping only — not a securities offering platform.

## Data residency

- Wealth data stays on-device unless you export a backup. No accounts or cloud vault.

## PWA / supply chain

- Static assets served from GitHub Pages; verify `sw.js` cache version (`stundsOS-v8`) when updating.
- Do not commit `.env` or API keys to the repository.

## Reporting

Open a private security issue on the [LedgerCap GitHub repo](https://github.com/shamikhahmed/LedgerCap) for vulnerabilities.
