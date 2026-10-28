#!/usr/bin/env bash
#
# Builds the site into dist on a fresh Linux or macOS host: installs the
# site's packages (esdev comes from the @opentf/afw-cli devDependency) and
# runs its build. Written for Cloudflare Workers Builds:
#
#   Root directory      (repository root)
#   Build command       bash scripts/build-site.sh
#   Deploy command      npx wrangler deploy
#   Variables           SKIP_DEPENDENCY_INSTALL=1   (this script installs)
#
#   ESDEV_VERSION is not used here: esdev is pinned by the lockfile, so
#   automated builds always match `pnpm install` locally.
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
site="$repo_root"

# "Last updated" dates and the sitemap's <lastmod> come from each page's last
# commit. A shallow clone has one commit, which would date every page to it.
if [ "$(git -C "$repo_root" rev-parse --is-shallow-repository 2>/dev/null)" = true ]; then
  git -C "$repo_root" fetch --unshallow --quiet ||
    echo "warning: could not fetch full history; pages will show the latest commit's date" >&2
fi

# The site pins pnpm in its package.json; install that version when the host
# has none.
if ! command -v pnpm >/dev/null 2>&1; then
  pnpm_spec="$(node -p 'require(process.argv[1]).packageManager' "$site/package.json")"
  npm install --global --silent "$pnpm_spec"
fi

pnpm --dir "$site" install --frozen-lockfile
pnpm --dir "$site" run build
