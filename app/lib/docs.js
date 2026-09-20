import { marked, Renderer } from "marked";

// Derive raw.githubusercontent.com URL(s) from a GitHub href.
// Blob URLs (with /blob/BRANCH/PATH) resolve to exactly one URL.
// Repo-root URLs (no blob segment) try main then master.
export function rawUrlsFor(href) {
  const blob = href.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/,
  );
  if (blob)
    return [`https://raw.githubusercontent.com/${blob[1]}/${blob[2]}/${blob[3]}/${blob[4]}`];

  const repo = href.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
  if (repo) {
    const [, org, name] = repo;
    return [
      `https://raw.githubusercontent.com/${org}/${name}/main/README.md`,
      `https://raw.githubusercontent.com/${org}/${name}/master/README.md`,
    ];
  }
  return [];
}

// Fetch the raw markdown source for a document, trying each candidate URL.
// Resolves to `{ text, url }` where `url` is the raw source that was read, so
// relative links inside the document can be based on it.
export async function fetchDocSource(href, opts) {
  const urls = rawUrlsFor(href);
  if (!urls.length) throw new Error("Invalid source URL");
  let lastErr;
  for (const url of urls) {
    try {
      const res = await fetch(url, opts);
      if (res.ok) return { text: await res.text(), url };
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (e.name === "AbortError") throw e;
      lastErr = e;
    }
  }
  throw lastErr;
}

// Parse inline bold metadata from the header of a proposals/specs README.
// The header runs from the top of the file down to the first standalone `---`.
export function parseDoc(src) {
  const idx = src.search(/^---\s*$/m);
  const header = idx >= 0 ? src.slice(0, idx) : "";
  let body = idx >= 0 ? src.slice(idx + 3) : src;
  body = body.replace(/^\s+/, "");

  // Lines look like `**Status:** Draft` — the closing `**` follows the colon.
  const meta = {};
  for (const line of header.split("\n")) {
    const m = line.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
    if (m) meta[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return { meta, body };
}

// Strip dangerous markup from rendered HTML.
const DISALLOWED =
  /<script[\s>][\s\S]*?<\/script>|on[a-z]+=("[^"]*"|'[^']*')/gi;

function sanitize(html) {
  return html.replace(DISALLOWED, "");
}

const EXTERNAL_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const RAW_HOST = "raw.githubusercontent.com";

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Resolve a relative href against the raw URL the source was fetched from.
// Anchor links (`#section`) resolve too, so they point at the same section on
// the GitHub blob page. Absolute URLs (http, https, mailto, data, //) pass
// through untouched.
function resolveRelative(href, baseUrl) {
  if (!href) return href;
  if (href.startsWith("//")) return href;
  if (EXTERNAL_SCHEME.test(href)) return href;
  try {
    return new URL(href, baseUrl).href;
  } catch {
    return href;
  }
}

// Convert a `raw.githubusercontent.com` URL back into a `github.com/blob` URL
// so navigation links open on GitHub instead of downloading raw content.
function toGithubBlob(url) {
  const m = url.match(
    /^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/,
  );
  return m
    ? `https://github.com/${m[1]}/${m[2]}/blob/${m[3]}/${m[4]}`
    : url;
}

function isHttpUrl(url) {
  return typeof url === "string" && /^https?:\/\//i.test(url);
}

// GitHub-style heading slug: lowercased, non-letter / non-digit runs collapse
// into hyphens, trimmed. (The source repos use exactly these anchors.)
function slugify(text) {
  return text
    .replace(/<[^>]+?>/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// A marked renderer that rebases relative links/images against the document's
// raw source URL so they point back at GitHub instead of the local route. It
// also stamps GitHub-style ids on headings so in-page anchors (and `#...`
// URLs) resolve.
function markdownRenderer(baseUrl) {
  const renderer = new Renderer();
  const headingCounts = {};
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens, this.parser.textRenderer) || "";
    const slug = slugify(text);
    // Downgrade h1 → h2: the page already provides its own <h1>, so markdown body
    // headings must not produce a second one.
    const effectiveDepth = depth === 1 ? 2 : depth;
    if (!slug) return `<h${effectiveDepth}>${this.parser.parseInline(tokens)}</h${effectiveDepth}>`;
    const n = (headingCounts[slug] = (headingCounts[slug] || 0) + 1);
    const id = n > 1 ? `${slug}-${n - 1}` : slug;
    return `<h${effectiveDepth} id="${id}">${this.parser.parseInline(tokens)}</h${effectiveDepth}>`;
  };
  renderer.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const url =
      href && !href.startsWith("//") && !EXTERNAL_SCHEME.test(href)
        ? toGithubBlob(resolveRelative(href, baseUrl))
        : href;
    let attrs = url != null ? `href="${escapeAttr(url)}"` : "";
    if (title) attrs += ` title="${escapeAttr(title)}"`;
    if (isHttpUrl(url)) attrs += ` target="_blank" rel="noreferrer noopener"`;
    return `<a ${attrs}>${text}</a>`;
  };
  renderer.image = function ({ href, title, text }) {
    const url =
      href && !href.startsWith("#") && !EXTERNAL_SCHEME.test(href)
        ? resolveRelative(href, baseUrl)
        : href;
    let attrs = url != null ? `src="${escapeAttr(url)}"` : "";
    if (title) attrs += ` title="${escapeAttr(title)}"`;
    return `<img alt="${escapeAttr(text || "")}"${attrs ? ` ${attrs}` : ""}>`;
  };
  return renderer;
}

// Render markdown → sanitized HTML. Relative links are rebased to absolute
// GitHub URLs when `baseUrl` (the raw source URL) is provided.
export function renderMarkdown(src, { baseUrl } = {}) {
  return sanitize(
    marked.parse(src, { gfm: true, renderer: baseUrl ? markdownRenderer(baseUrl) : undefined }),
  );
}
