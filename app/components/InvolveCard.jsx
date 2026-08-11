import Icon from "./Icon.jsx";

// One way to participate. Renders as a link card when `href` is set.
export default function InvolveCard(props) {
  const c = props.item;

  return (
    <a
      href={c.href}
      target={c.external ? "_blank" : null}
      rel={c.external ? "noreferrer" : null}
      class="group h-full flex flex-col gap-3 p-6 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] transition-colors hover:border-[var(--otfw-accent)]/40"
    >
      <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--otfw-accent-soft)] text-[var(--accent-text)]">
        <Icon name={c.icon} size={20} />
      </span>

      <h3 class="text-base font-bold text-[var(--otfw-text)] group-hover:text-[var(--accent-text)] transition-colors">
        {c.title}
      </h3>

      <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
        {c.body}
      </p>

      <span class="inline-flex items-center gap-1.5 pt-2 mt-auto text-xs font-semibold text-[var(--accent-text)]">
        {c.action}
        <Icon name="arrow" size={14} weight={2.4} />
      </span>
    </a>
  );
}
