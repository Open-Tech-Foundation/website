export default function PolicySection({ index, title, children }) {
  return (
    <section class="mt-14 md:mt-20 pt-10 md:pt-14 border-t border-[var(--afw-border)] first:mt-0 first:pt-0 first:border-0">
      <h2 class="mt-12 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-[var(--afw-text)]">
        {index ? (
          <span class="font-mono text-sm font-bold text-[var(--accent-text)] mr-3 align-middle">
            {index}
          </span>
        ) : null}{" "}
        {title}
      </h2>
      <div class="space-y-4 text-[var(--afw-text-muted)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}
