import Icon from "./Icon.jsx";

// One of the seven mission principles. `expanded` adds the longer `detail` paragraph;
// the home page passes it, since the principles live there and nowhere else.
export default function PrincipleCard(props) {
  const p = props.item;

  return (
    <div
      id={props.expanded ? p.id : null}
      class="h-full flex flex-col gap-3 p-6 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] scroll-mt-24 transition-colors hover:border-[var(--otfw-accent)]/40"
    >
      <div class="flex items-center gap-3">
        <span class="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-[var(--otfw-accent-soft)] text-[var(--accent-text)]">
          <Icon name={p.icon} size={20} />
        </span>
        <h3 class="text-base font-bold text-[var(--otfw-text)]">{p.name}</h3>
      </div>

      <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
        {p.summary}
      </p>

      {props.expanded ? (
        <p class="text-sm text-[var(--otfw-text)]/80 leading-relaxed border-t border-[var(--otfw-border)] pt-3 mt-auto">
          {p.detail}
        </p>
      ) : null}
    </div>
  );
}
