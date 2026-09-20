import Icon from "../components/Icon.jsx";
import InvolveCard from "../components/InvolveCard.jsx";

export const metadata = {
  title: "Get Involved",
  description:
    "Contribute to Open Tech Foundation initiatives, open issues and discussions, share ideas and feedback, support the mission, or stand for Core Membership.",
  canonical: "/get-involved",
};

const GITHUB = "https://github.com/Open-Tech-Foundation";

// The four routes into the project, straight from the foundation's charter — each one
// pointed at the place where that kind of participation actually happens.
const WAYS = [
  {
    icon: "code",
    title: "Contribute to initiatives",
    body: "Pick up an issue, improve documentation, or send a patch. Every repository takes pull requests, and good first issues are labelled.",
    action: "Browse the repositories",
    href: GITHUB,
    external: true,
  },
  {
    icon: "chat",
    title: "Open issues & discussions",
    body: "Report a bug, propose a feature, or ask how something is meant to work. Design decisions get made in these threads, in public.",
    action: "Start a discussion",
    href: "https://github.com/orgs/Open-Tech-Foundation/discussions",
    external: true,
  },
  {
    icon: "spark",
    title: "Share ideas & feedback",
    body: "Tell us what is missing, what is broken, or what you wish existed. Roadmaps are shaped by contributors, not by a central plan.",
    action: "Email the foundation",
    href: "mailto:contact@opentechf.org",
  },
  {
    icon: "heart",
    title: "Support the mission",
    body: "The foundation is non-profit and volunteer-run, and the work is funded by the people who value it. Sponsorship pays for the unglamorous parts — infrastructure, domains, security audits, and the sustained time that carries a project from proposal to release. Any amount helps, and every project stays free and open regardless.",
    action: "Sponsor on GitHub",
    href: "https://github.com/sponsors/Open-Tech-Foundation",
    external: true,
  },
];


// Core Membership duties, in charter order. This is the governing body's mandate as
// stated by the Foundation; it is not a substitute for incorporated bylaws.
const DUTIES = [
  {
    title: "Vote on organisation-wide decisions",
    body: "Each Core Member holds one vote on matters affecting the Foundation as a whole — the adoption of proposals and specifications, the admission and retirement of projects, the allocation of Foundation funds, and any amendment to this charter.",
  },
  {
    title: "Guide the mission",
    body: "Core Members are custodians of the Foundation's mission and of the seven principles that follow from it. They are responsible for ensuring that the work the Foundation undertakes, and the work it declines, remains consistent with them.",
  },
  {
    title: "Direct research and development",
    body: "Core Members set the Foundation's research priorities, review the technical direction of its projects, and determine which lines of enquiry the Foundation commits its resources to.",
  },
  {
    title: "Oversee legal matters",
    body: "Core Members are responsible for the Foundation's legal and compliance obligations, including licensing, trademark, the terms under which the Foundation's work is published, and its standing as a non-profit body.",
  },
];

export default function GetInvolvedPage() {
  return (
    <div class="w-full">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            Community governance
          </p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            Get involved
          </h1>
        </div>
      </section>

      <section class="px-6 py-16">
        <div class="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2">
          {WAYS.map((c) => (
            <InvolveCard key={c.title} item={c} />
          ))}
        </div>
      </section>

      <section class="px-6 py-20 border-t border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)]">
        <div class="max-w-3xl mx-auto space-y-8">
          <div class="space-y-3">
            <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Governance
            </p>
            <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-[var(--otfw-text)]">
              Core Members
            </h2>
          </div>

          <p class="text-[var(--otfw-text)]/85 leading-relaxed">
            The Foundation is directed by a Core Membership: a body of senior
            technologists drawn from different disciplines and industries, who
            together hold responsibility for decisions affecting the Foundation as a
            whole. The Core Membership exists so that those decisions are made by
            people with the depth to judge their consequences, and from more than one
            tradition of practice.
          </p>

          <div class="space-y-3">
            <h3 class="text-base font-bold text-[var(--otfw-text)]">Eligibility</h3>
            <p class="text-[var(--otfw-text-muted)] leading-relaxed">
              A candidate for Core Membership shall have a minimum of ten (10) years of
              professional experience in technology or a directly related discipline.
              The Core Membership is constituted to be varied in background —
              engineering, research, operations, security, design, and law among them —
              and appointments are made with that breadth in view.
            </p>
          </div>

          <div class="space-y-3">
            <h3 class="text-base font-bold text-[var(--otfw-text)]">Appointment</h3>
            <p class="text-[var(--otfw-text-muted)] leading-relaxed">
              The Core Membership is self-constituting. Its first member is the founder
              of the Foundation; each subsequent member is admitted by a vote of those
              already serving, who assess the candidate's background and experience
              against the eligibility requirements above. No seat is conferred by
              employment, sponsorship, or donation.
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="text-base font-bold text-[var(--otfw-text)]">
              Responsibilities
            </h3>
            <ol class="space-y-4">
              {DUTIES.map((d, i) => (
                <li class="flex gap-4 p-5 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg)]">
                  <span class="shrink-0 font-mono text-sm font-bold text-[var(--accent-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div class="space-y-1.5">
                    <h4 class="font-bold text-[var(--otfw-text)]">{d.title}</h4>
                    <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div class="space-y-6 pt-6 border-t border-[var(--otfw-border)]">
            <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-[var(--otfw-text)]">
              Contributing Members
            </h2>

            <p class="text-[var(--otfw-text)]/85 leading-relaxed">
              Contribution to the Foundation is open to anyone and requires no
              appointment: the repositories take pull requests, issues, and discussion
              from any person who wishes to take part. Contributing Membership is a
              separate, named post for domain experts who take responsibility for the
              stewardship of a particular project or subject area. The post is not
              exclusive: a field may hold several Contributing Members, and is expected
              to as the work in it grows.
            </p>

            <div class="space-y-3">
              <h3 class="text-base font-bold text-[var(--otfw-text)]">
                The post
              </h3>
              <p class="text-[var(--otfw-text-muted)] leading-relaxed">
                A Contributing Member reviews contributions, triages issues, and
                moderates discussion within the project or domain they serve, and is
                expected to be consistently available to do so. The post is applied for
                and is granted on the basis of demonstrated expertise in the relevant
                domain.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-base font-bold text-[var(--otfw-text)]">
                Relation to the Core Membership
              </h3>
              <p class="text-[var(--otfw-text-muted)] leading-relaxed">
                Contributing Members do not hold a vote on organisation-wide matters,
                which rest with the Core Membership. The two posts are distinct in
                purpose: the Core Membership decides the direction of the Foundation,
                while Contributing Members carry the day-to-day stewardship of the work
                it publishes.
              </p>
            </div>
          </div>

          <div class="space-y-3 pt-6 border-t border-[var(--otfw-border)]">
            <h3 class="text-base font-bold text-[var(--otfw-text)]">
              Expressions of interest
            </h3>
            <p class="text-[var(--otfw-text-muted)] leading-relaxed">
              The Foundation welcomes applications for either post. Write to us with an
              account of your background, the disciplines or projects you would take
              responsibility for, and which of the two you have in mind.
            </p>
            <a
              href="mailto:contact@opentechf.org"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]"
            >
              <Icon name="mail" size={16} />
              contact@opentechf.org
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
