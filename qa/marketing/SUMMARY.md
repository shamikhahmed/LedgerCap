# LedgerCap marketing capture — 3.58.11

**Status:** Phase A complete — capture not run yet (Cursor sandbox cannot launch browsers).

## Reviewer

```bash
cd /Users/shamikhahmed/Projects/Cap/Cap-Apps/_workspace/LedgerCap-hig
bash qa/marketing/capture.sh
```

Then paste this file (rewritten by the script) or the terminal summary back into Cursor for Phase B.

## Expected outputs

| Step | Path |
| --- | --- |
| Gallery webps | `shots/{dark,light}/{iphone,ipad,mac}/*-demo.webp` (hub names) |
| App Store PNGs | `qa/marketing/appstore/` (6.9″ 1320×2868, 13″ iPad 2064×2752) |
| Walkthrough | `site/walkthrough.mp4` (+ poster) or `.webm` if ffmpeg missing |
| Lighthouse | `qa/marketing/lighthouse/landing.json` if `npx lighthouse` offline |
