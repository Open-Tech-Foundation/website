# Open Tech Foundation Website

The official site for the Open Tech Foundation, built with our own framework,
[OTF Web](https://web.opentechf.org).

**Live site:** https://opentechf.org/

**Advocacy • Collaboration • Open Innovation**

We are a community-driven, non-profit initiative advancing open technologies — including
open source, open data, open standards, and open protocols — for the public good.

## Stack

- **[OTF Web](https://web.opentechf.org)** (`@opentf/web`) — zero-VDOM framework; JSX
  compiles to native DOM
- **[`@opentf/web-docs`](https://web.opentechf.org/docs/packages/web-docs)** — supplies the
  navbar, footer, and the light/dark theme tokens, so this site and the framework site
  share one visual language
- **Tailwind CSS v4** — utilities, on top of the theme's `--otfw-*` design tokens
- **Cloudflare Workers** — static asset hosting

Every route is pre-rendered to static HTML (`otfw build --ssg`), so the pages carry their
full content and `<head>` before any JavaScript runs.

## Structure

```
app/
  layout.jsx          root layout: navbar, dark footer, site-wide SEO + JSON-LD
  page.jsx            /                       home: mission, principles, featured projects
  projects/
    page.jsx          /projects               full index, grouped by category
    [slug]/           /projects/<id>          one page per project (pre-rendered)
  proposals/
    software/         /proposals/software
    hardware/         /proposals/hardware
  specifications/
    software/         /specifications/software
    hardware/         /specifications/hardware
  get-involved/       /get-involved           how to contribute
  contact/            /contact                contact + security disclosure
  404.jsx             the 404 page (renders WITHOUT the root layout — see the file)
  components/         shared UI (cards, banners, division tabs, icons, mobile nav)
  data/
    projects.js       ← SINGLE SOURCE OF TRUTH for everything project-related
    principles.js     the seven principles (rendered on the home page)
  global.css          Tailwind entry, brand + accessible accent tokens, footer tokens
otfw.config.js        site URL, navbar links, brand
index.html            app shell + the no-flash theme bootstrap
public/img/banners/   one SVG per project, drawn to show what that project does
```

### `app/data/projects.js`

Everything the site says about projects lives in this one file, and every page renders
from it: the software / hardware **divisions**, the **categories**, the five-state
**status scale** (with the text the index legend shows), the **projects**, the
**proposals**, and the **specifications**. Counts, tabs, category sections, and the
per-project pages are all derived — there is nothing to keep in sync by hand.

### Adding a project

Append an entry to `projects`:

- **`division`** — `"software"` or `"hardware"`. Decides which tab it appears under.
  Software is the default active tab.
- **`category`** — `web`, `web-development`, `developer-tools`, `data`, or `media`. The
  index groups projects under these headings; the home page shows a flat grid of the
  featured ones with a category tag on each card.
- **`featured`** — set `true` and it appears on the home page. This is the only edit
  needed to promote or demote a project.
- **`status`** — earliest first: `"draft"`, `"under-development"`, `"alpha"`, `"beta"`,
  `"stable"`. The index legend renders from `STATUS`, so the badge and its explanation
  cannot drift apart.
- **`href`** — the GitHub repository. **`site`** — the project's own site, if it has one
  (e.g. `https://tsr.opentechf.org`); it becomes a Website link on the project page.
- **`license`** — the SPDX id **as published on the repository**; check it there rather
  than assuming. The projects are not on a single licence (currently 7 MIT, 4 Apache-2.0,
  2 AGPL-3.0), and it is shown on every card and project page.
- **`banner`** — `"/img/banners/<id>.svg"`. Every project has one, drawn to show what it
  actually does. A project added without one falls back to a generated panel in the same
  visual language until its own banner is drawn.

A page at `/projects/<id>` is generated automatically — `getStaticPaths` enumerates the
`projects` array, so no route needs adding.

### Adding a proposal or specification

Both are documents with the same shape (`id`, `division`, `title`, `status`, `summary`,
`href`) and both render through the same components; they differ only in the wording held
in `DOC_KINDS`. Add to the `proposals` or `specifications` array and the counts, cards,
and index pages follow. Statuses are the Proposals repo's own scale: Draft, Review,
Accepted, Rejected, Superseded.

A specification is a document, not a project entry — it graduates into `projects` if and
when it grows an implementation worth listing on its own.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build     # otfw build --ssg
```

Outputs to `dist/` — one pre-rendered `.html` per route, plus `sitemap.xml`,
`robots.txt`, `404.html`, and `llms.txt`.

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

## Conventions worth knowing

- **Colour.** `--otfw-accent` (the brand orange) is a *fill* colour. For accent-coloured
  **text** use `--accent-text`, for text sitting **on** an accent fill use `--accent-on`,
  and for muted text on an accent-soft surface use `--text-muted-on-accent`. The raw
  orange fails WCAG AA as text; see the comment in `global.css` for the measured ratios.
  Every text/background pair on the site has been checked against AA in both themes.
- **The footer is dark in both themes** by design, via its own `--footer-*` tokens
  scoped to `.site-footer`.
- **Tailwind's `dark:` variant** is bound to `[data-theme="dark"]`, not
  `prefers-color-scheme` — the theme toggle writes that attribute, and the two disagree
  whenever a visitor's explicit choice differs from their OS setting.
- **Third-party requests.** There are none — no CDN fonts, no analytics, no remote
  assets. The Privacy principle applies to this site too.
- **The 404 page** renders without the root layout (the framework matches it with
  `route: null`, so the layout chain is empty). It carries its own navbar and footer.
- **One `return` per component.** The compiler builds each component into a single
  element factory; a second `return` renders correctly under SSG but leaves the custom
  element empty once the client hydrates. Use a ternary, not an early return.
- **Whole-card links** use the `card-link` overlay (`global.css`) rather than wrapping
  the card in an `<a>` — an `<a>` cannot nest inside an `<a>`. Anything that must stay
  separately clickable inside a card needs `relative z-10`.
- **Language marks** are single-path glyphs from simple-icons (SVG files are CC0; the
  marks remain their owners' trademarks, used only to identify a project's language).
