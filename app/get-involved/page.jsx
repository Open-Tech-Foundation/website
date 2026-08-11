import InvolveCard from "../components/InvolveCard.jsx";

export const metadata = {
  title: "Get Involved",
  description:
    "Contribute to Open Tech Foundation initiatives, open issues and discussions, share ideas and feedback, or support the mission.",
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
    href: `${GITHUB}/Web-App-Framework/discussions`,
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
            <InvolveCard item={c} />
          ))}
        </div>
      </section>

    </div>
  );
}
