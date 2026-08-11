import { Link } from "@opentf/web";
import Icon from "./Icon.jsx";

// A lead card in a division: a label, a count, and nothing else — the documents
// themselves live on the page it links to. Used for both proposals and specifications,
// which differ only in their wording and destination.
export default function CountCard(props) {
  const count = props.count || 0;

  return (
    <Link
      href={props.href}
      class="group h-full flex flex-col justify-between gap-4 p-6 rounded-2xl border border-dashed border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] cursor-pointer transition-colors hover:border-[var(--otfw-accent)]"
    >
      <div class="flex items-start justify-between gap-3">
        <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--otfw-accent-soft)] text-[var(--accent-text)]">
          <Icon name={props.icon} size={20} />
        </span>
        <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-text)]">
          {props.label}
        </span>
      </div>

      <div>
        <p class="text-5xl font-black tracking-tight text-[var(--accent-text)] leading-none">
          {count}
        </p>
        <p class="mt-2 text-sm text-[var(--otfw-text-muted)]">
          {count === 1 ? props.noun : props.nounPlural}
        </p>
      </div>

      <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-text)]">
        {count === 0 ? props.emptyCta : props.cta}
        <Icon name="arrow" size={14} weight={2.4} />
      </span>
    </Link>
  );
}
