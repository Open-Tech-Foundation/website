# Open Tech Foundation Website

Static coming soon page. A new site is in the works.

**Live site:** https://opentechf.org/

**Advocacy • Collaboration • Open Innovation**

We are a community-driven, non-profit initiative advancing open technologies — including open source, open data, open standards, and open protocols — for the public good.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Outputs to `dist/` for Cloudflare Workers static assets.

## Deploy

```bash
pnpm deploy
```

**Cloudflare settings:**
- Build command: `pnpm run build`
- Deploy command: `wrangler deploy`
- Output directory: `dist`

## Preview production build

```bash
pnpm preview
```