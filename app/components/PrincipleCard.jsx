import Icon from "./Icon.jsx";

// One of the seven mission principles. The home page passes `expanded`, since the
// longer explanation only appears alongside the complete mission statement.
export default function PrincipleCard(props) {
  const p = props.item;
  const number = String((props.index || 0) + 1).padStart(2, "0");

  return (
    <div
      id={props.expanded ? p.id : null}
      class="group relative h-full overflow-hidden rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] p-6 scroll-mt-24 transition-all hover:-translate-y-0.5 hover:border-[var(--otfw-accent)]/50 hover:shadow-lg hover:shadow-black/5"
    >
      <div class="absolute inset-x-0 top-0 h-1 bg-[var(--otfw-accent)] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />

      <div class="flex items-start justify-between gap-4">
        <span class="flex items-center justify-center size-11 shrink-0 rounded-full border border-[var(--otfw-accent)]/25 bg-[var(--otfw-accent-soft)] text-[var(--accent-text)]">
          <Icon name={p.icon} size={20} weight={2} />
        </span>
        <span class="font-mono text-xs font-bold tracking-wider text-[var(--otfw-text-muted)]">
          {number}
        </span>
      </div>

      <div class="mt-8 space-y-3">
        <h3 class="text-xl font-bold tracking-tight text-[var(--otfw-text)]">
          {p.name}
        </h3>
        <p class="text-sm font-semibold leading-relaxed text-[var(--accent-text)]">
        {p.summary}
        </p>
      </div>

      {props.expanded ? (
        <p class="mt-6 border-t border-[var(--otfw-border)] pt-5 text-sm leading-relaxed text-[var(--otfw-text-muted)]">
          {p.detail}
        </p>
      ) : null}
    </div>
  );
}
