export default function PolicyHero({ title }) {
  return (
    <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
      <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
        <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
          Policy
        </p>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
          {title}
        </h1>
      </div>
    </section>
  );
}
