import { Link } from "@opentf/web";
import Icon from "./Icon.jsx";
import LangIcon from "./LangIcon.jsx";
import ProjectBanner from "./ProjectBanner.jsx";
import { categoryById, STATUS } from "../data/projects.js";

const TAG =
  "inline-flex items-center px-2 py-0.5 rounded-md bg-[var(--otfw-bg)] border border-[var(--otfw-border)] text-[10px] font-bold uppercase tracking-wider text-[var(--otfw-text-muted)]";

// A project in the index.
//
//   compact   home page — tagline only; the index adds the detail paragraph
//   banner    draw artwork above the title (see ProjectBanner for the fallback)
//   category  tag mode: the footer carries category/language tags instead of outbound
//             links. Passed where the cards are NOT already under a category heading
//             (the home page grid), so the tag adds information rather than repeating
//             it — and the card stays a single destination rather than a link cluster.
//
// The whole card is one click target for /projects/<id>: the title link carries a
// `card-link` overlay that stretches across the card (see global.css). That keeps the
// markup valid — an <a> cannot nest inside an <a> — while the outbound Source / Website
// / npm links on the index cards sit above the overlay and stay independently clickable.
export default function ProjectCard(props) {
  const p = props.item;
  const status = STATUS[p.status];
  const category = categoryById[p.category];
  const href = `/projects/${p.id}`;

  return (
    <div class="relative h-full flex flex-col rounded-2xl border border-[var(--otfw-border)] bg-white dark:bg-[var(--otfw-bg-elevated)] overflow-hidden cursor-pointer transition-colors hover:border-[var(--otfw-accent)]/40">
      {props.banner ? <ProjectBanner item={p} /> : null}

      <div class="flex flex-col gap-3 p-6 flex-1">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-base font-bold text-[var(--otfw-text)]">
            <Link
              href={href}
              class="card-link hover:text-[var(--accent-text)] transition-colors"
            >
              {p.name}
            </Link>
          </h3>
          <span
            class={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${status.cls}`}
          >
            {status.label}
          </span>
        </div>

        <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
          {p.tagline}
        </p>

        {props.compact ? null : (
          <p class="text-sm text-[var(--otfw-text)]/75 leading-relaxed">{p.detail}</p>
        )}

        {props.category ? (
          <div class="flex flex-wrap items-center gap-2 pt-3 mt-auto border-t border-[var(--otfw-border)]">
            {category ? <span class={TAG}>{category.name}</span> : null}
            {p.lang ? (
              <span class={`${TAG} gap-1.5`}>
                <LangIcon lang={p.lang} size={12} />
                {p.lang}
              </span>
            ) : null}
            {p.license ? <span class={TAG}>{p.license}</span> : null}
          </div>
        ) : (
          <div class="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 mt-auto border-t border-[var(--otfw-border)] text-xs">
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-1.5 font-semibold text-[var(--otfw-text-muted)] hover:text-[var(--accent-text)] transition-colors"
            >
              <Icon name="github" size={14} />
              Source
            </a>

            {p.site ? (
              <a
                href={p.site}
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-1.5 font-semibold text-[var(--otfw-text-muted)] hover:text-[var(--accent-text)] transition-colors"
              >
                <Icon name="globe" size={14} />
                Website
              </a>
            ) : null}

            <span class="ml-auto inline-flex items-center gap-3 text-[var(--otfw-text-muted)]">
              {p.license ? <span>{p.license}</span> : null}
              {p.lang ? (
                <span class="inline-flex items-center gap-1.5">
                  <LangIcon lang={p.lang} size={12} />
                  {p.lang}
                </span>
              ) : null}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
