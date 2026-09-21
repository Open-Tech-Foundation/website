import { Link } from "@opentf/web";

export const metadata = {
  title: "About",
  description:
    "Open Tech Foundation (OTF) is an open technology organization building software and hardware technologies for developers, enterprises, and the general public.",
  canonical: "/about",
};

const CONSTRAINTS = [
  {
    title: "Accessibility",
    body: "Technology should be accessible and usable by as many people as possible.",
  },
  {
    title: "Interoperability",
    body: "Technology should work across systems without unnecessary dependence on a particular vendor, runtime, or platform.",
  },
  {
    title: "Privacy",
    body: "Zero telemetry. No tracking, analytics beacons, or phoning home.",
  },
  {
    title: "Security",
    body: "Security is treated as a fundamental part of designing, building, and maintaining our technology.",
  },
  {
    title: "Transparency",
    body: "Our technology, decisions, limitations, and development should be open and understandable.",
  },
  {
    title: "Sustainability",
    body: "Technology should remain practical to operate, maintain, and use over the long term.",
  },
  {
    title: "Community Governance",
    body: "Governance belongs to people and the community, rather than corporate interests.",
  },
];

const FUNDING = [
  "Public donations",
  "General support through GitHub Sponsors",
  "Selected advertising on OTF-operated websites",
];

function Section({ eyebrow, title, children }) {
  return (
    <section class="mt-14 md:mt-20 pt-10 md:pt-14 border-t border-[var(--otfw-border)] first:mt-0 first:pt-0 first:border-0">
      {eyebrow ? (
        <p class="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 class="mt-12 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-[var(--otfw-text)]">
        {title}
      </h2>
      <div class="space-y-4 text-[var(--otfw-text-muted)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div class="w-full">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            Open Tech Foundation
          </p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            About Open Tech Foundation
          </h1>
          <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
            Open Tech Foundation (OTF) is an open technology organization
            building{" "}
            <strong class="font-bold text-[var(--otfw-text)]">
              software and hardware technologies for developers, enterprises,
              and the general public
            </strong>
            .
          </p>
          <p class="text-[var(--otfw-text-muted)] leading-relaxed">
            Our projects operate under a common set of constraints that guide
            how they are designed, developed, maintained, released, funded, and
            governed.
          </p>
        </div>
      </section>

      <div class="px-6 py-16 md:py-20">
        <div class="max-w-3xl mx-auto">
          <Section eyebrow="What guides us" title="Our Constraints">
            <p>
              OTF is built around seven constraints. These constraints are one
              of the reasons OTF exists as a separate organization. They are
              not features that we selectively apply to individual projects;
              they form a common baseline for the technology we build.
            </p>
            <ul class="mt-6 space-y-4">
              {CONSTRAINTS.map((c, i) => (
                <li
                  key={c.title}
                  class="flex gap-4 p-5 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)]"
                >
                  <span class="shrink-0 font-mono text-sm font-bold text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div class="space-y-1">
                    <h3 class="font-bold text-[var(--otfw-text)]">{c.title}</h3>
                    <p class="text-sm leading-relaxed">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Correctness First">
            <p>
              We choose correctness before chasing speed or performance numbers.
            </p>
            <p>
              Performance and efficiency remain important engineering
              considerations, but we do not optimize projects simply to produce
              better benchmark results or claim that something is the fastest.
            </p>
            <p>A project should first do what it promises to do, correctly and reliably.</p>
          </Section>

          <Section title="External Dependencies">
            <p>
              We aim to minimize external project and package dependencies
              wherever practical.
            </p>
            <p>
              Every external dependency introduces additional code, maintainers,
              infrastructure, release processes, and potentially transitive
              dependencies that a project must trust.
            </p>
            <p>
              Reducing unnecessary dependencies helps us reduce exposure to
              software supply-chain attacks and keeps the trust surface of our
              projects smaller.
            </p>
            <p>
              This is not a prohibition on external dependencies. When a
              dependency provides clear technical value, we can use it
              deliberately.
            </p>
          </Section>

          <Section title="No External Project Incubation">
            <p>OTF does not accept external projects for incubation.</p>
            <p>
              Projects developed under OTF remain within our development and
              security expectations from their beginning. This helps us maintain
              a more controlled project surface and minimize security
              vulnerabilities and risks introduced through externally originated
              codebases.
            </p>
            <p>
              This does not prevent outside participation. Individuals,
              communities, and companies are welcome to contribute technically
              to OTF projects.
            </p>
          </Section>

          <Section title="Human-Driven Releases">
            <p>
              OTF projects use{" "}
              <strong class="font-bold text-[var(--otfw-text)]">
                Semantic Versioning (SemVer)
              </strong>{" "}
              where applicable.
            </p>
            <p>Releases, however, are intentional human decisions.</p>
            <p>
              A commit, merge, or automated workflow does not by itself decide
              that a new release should exist. A human decides when a project is
              ready, what the release represents, and the appropriate version
              change.
            </p>
            <p>Automation can handle the repetitive mechanics after that decision.</p>
            <p>
              This also preserves the actual intention of the changelog. A
              changelog should explain what a release means rather than simply
              being an automatically generated history of commits.
            </p>
          </Section>

          <Section title="Independent Governance">
            <p>
              OTF membership and governance are for{" "}
              <strong class="font-bold text-[var(--otfw-text)]">
                individuals, not corporations
              </strong>
              .
            </p>
            <p>
              A company cannot become an OTF member, hold voting rights, or
              receive a governance seat. Employment by a company does not prevent
              someone from participating in OTF; they participate as an
              individual.
            </p>
            <p>
              At the same time, we are open to working technically with companies
              and enterprises.
            </p>
            <p>
              They can contribute code, testing, interoperability work, bug
              reports, technical discussions, implementations, and other useful
              work to OTF projects.
            </p>
            <p>Technical collaboration does not grant governance authority.</p>
          </Section>

          <Section title="Project Sponsorship">
            <p>Commercial companies cannot sponsor an individual OTF project.</p>
            <p>
              Companies can provide general support to Open Tech Foundation, but
              financial support cannot be attached to a particular project in a
              way that gives the supporter influence over that project&apos;s
              technical direction.
            </p>
            <p>
              Supporting OTF does not purchase control over project roadmaps,
              releases, technical decisions, or governance.
            </p>
          </Section>

          <Section title="Funding">
            <p>Maintaining open technology requires infrastructure and resources.</p>
            <p>OTF currently considers several ways of supporting that work:</p>
            <ul class="list-disc pl-6 space-y-1.5 text-[var(--otfw-text)]">
              {FUNDING.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p>
              Advertising is a source of revenue for maintaining the
              organization; it is not project sponsorship.
            </p>
            <p>
              Financial support does not provide governance rights or control
              over OTF projects.
            </p>
          </Section>

          <Section title="Get Involved">
            <p>
              OTF is open to people who want to use, test, discuss, improve, or
              contribute to our technology.
            </p>
            <p>
              To learn about contributing, participation, and membership, visit
              our{" "}
              <Link
                href="/get-involved"
                class="font-semibold text-[var(--accent-text)] hover:underline"
              >
                Get Involved
              </Link>{" "}
              page.
            </p>
            <p>
              You can also support the Foundation and the work required to keep
              its projects available and maintained.
            </p>
            <p>
              Most importantly,{" "}
              <strong class="font-bold text-[var(--otfw-text)]">
                feedback of any kind is welcome
              </strong>
              . We want people to question our decisions, identify problems,
              propose improvements, and tell us where we can do better.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
