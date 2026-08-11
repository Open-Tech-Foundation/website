import InvolveCard from "../components/InvolveCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

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
    body: "Use the projects, cite them, write about them, and tell other people they exist. Adoption is what makes open technology stick.",
    action: "See what we build",
    href: "/projects",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Find a project",
    body: "Start with something you already use. The stable projects are the easiest place to land a first change.",
  },
  {
    n: "02",
    title: "Read the repo",
    body: "Each repository documents how to build it and run its tests. If that documentation is wrong, fixing it is a genuinely useful first contribution.",
  },
  {
    n: "03",
    title: "Open the conversation",
    body: "For anything beyond a small fix, open an issue first. It is faster to agree on an approach than to rework a finished patch.",
  },
  {
    n: "04",
    title: "Send the change",
    body: "Small, focused pull requests with a clear description get reviewed fastest.",
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
          <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
            The foundation is shaped by contributors, not control. There is no
            membership to apply for and no committee to clear — participation is
            the qualification.
          </p>
        </div>
      </section>

      <section class="px-6 py-16">
        <div class="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2">
          {WAYS.map((c) => (
            <InvolveCard item={c} />
          ))}
        </div>
      </section>

      <section class="px-6 py-20 border-t border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)]">
        <div class="max-w-4xl mx-auto space-y-12">
          <SectionHeading
            eyebrow="First contribution"
            title="How to start"
            lead="No process theatre — four steps from reading to merged."
          />

          <ol class="grid gap-4 sm:grid-cols-2">
            {STEPS.map((s) => (
              <li class="flex gap-4 p-6 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg)]">
                <span class="shrink-0 font-mono text-sm font-bold text-[var(--accent-text)]">
                  {s.n}
                </span>
                <div class="space-y-1.5">
                  <h3 class="font-bold text-[var(--otfw-text)]">{s.title}</h3>
                  <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
