// Centred section header: eyebrow, title, and an optional lead paragraph.
export default function SectionHeading(props) {
  return (
    <div class="text-center space-y-3 max-w-2xl mx-auto">
      {props.eyebrow ? (
        <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
          {props.eyebrow}
        </p>
      ) : null}
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-[var(--otfw-text)]">
        {props.title}
      </h2>
      {props.lead ? (
        <p class="text-[var(--otfw-text-muted)] leading-relaxed">{props.lead}</p>
      ) : null}
    </div>
  );
}
