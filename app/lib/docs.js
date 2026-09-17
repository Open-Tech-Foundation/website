import { marked } from "marked";

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
export async function fetchDocSource(href, opts) {
  const urls = rawUrlsFor(href);
  if (!urls.length) throw new Error("Invalid source URL");
  let lastErr;
  for (const url of urls) {
    try {
      const res = await fetch(url, opts);
      if (res.ok) return res.text();
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

// Render markdown → sanitized HTML.
export function renderMarkdown(src) {
  return sanitize(marked.parse(src, { gfm: true }));
}
