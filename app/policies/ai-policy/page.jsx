import PolicyHero from "../../components/PolicyHero.jsx";
import PolicySection from "../../components/PolicySection.jsx";

export const metadata = {
  title: "AI Policy",
  description:
    "Requirements for the use of artificial intelligence in Open Tech Foundation projects — permitted usage, human authority, review, verification, and human-controlled releases.",
  canonical: "/policies/ai-policy",
};

const SECTIONS = [
  {
    title: "Purpose",
    paras: [
      "Open Tech Foundation (OTF) permits the use of artificial intelligence (AI) to assist software development while maintaining human control over decisions, code acceptance, project changes, and releases.",
      "AI is a development assistant, not an independent decision-maker. Human maintainers remain responsible for the work accepted into OTF projects.",
      "This policy applies to all OTF projects and their development processes, from initial project bootstrap through implementation, pull requests, review, testing, and release.",
    ],
  },
  {
    title: "Permitted AI Usage",
    paras: ["AI tools and agents may assist with any development task, including:"],
    items: [
      "Project bootstrap and repository structure.",
      "Architecture proposals and implementation planning.",
      "Code generation, modification, and refactoring.",
      "Test creation, execution, and analysis.",
      "Documentation and configuration.",
      "Code review assistance, debugging, and security analysis.",
    ],
    after: [
      "AI-generated work must not be accepted solely because an AI agent produced it, automated checks passed, or another AI agent approved it. Appropriate human review and verification are required.",
    ],
  },
  {
    title: "Human Authority and Decision-Making",
    paras: [
      "AI agents must not make independent decisions about project direction, requirements, architecture, implementation choices, or other matters requiring a decision.",
    ],
    items: [
      "AI agents must follow the provided prompts, approved plans, and applicable instructions.",
      "When a decision is required, the AI must explain the issue and recommend an option for a human to decide.",
      "The AI must wait for human approval before implementing the proposed decision.",
      "AI recommendations, test results, and assessments do not constitute human approval.",
      "AI agents must not silently change approved plans or override existing decisions.",
    ],
  },
  {
    title: "Project Instructions",
    paras: [
      "Every OTF project using AI agents must follow the organization's common AI instructions and maintain project-specific instructions in an AGENTS.md file.",
    ],
    items: [
      "Organization-wide instructions establish common requirements applicable across OTF.",
      "Project-specific instructions define additional requirements and constraints for the individual project.",
      "AI agents must consult and follow both sets of instructions.",
      "Project-specific instructions must not override applicable organization-wide requirements.",
      "AI agents must not modify or disregard instructions to bypass required approval or control.",
    ],
  },
  {
    title: "Project Bootstrap",
    paras: [
      "AI may assist in creating an entire project, including its initial source code, repository structure, tests, documentation, and configuration.",
      "However, a project generated or initialized with AI assistance must be reviewed and approved by a human before it is accepted as an OTF project.",
      "The use of AI does not exempt a new project from OTF's existing policies, technical requirements, or approval processes.",
    ],
  },
  {
    title: "Pull Requests and Code Integration",
    items: [
      "AI agents may prepare code changes and supporting materials.",
      "A human must create and submit every pull request (PR).",
      "A human maintainer with appropriate project permissions must review and approve changes before they are merged.",
      "AI agents must never approve or merge their own changes.",
      "Merging a PR must always be performed by a human; AI agents must never merge PRs, even when a human has approved the changes.",
    ],
    after: [
      "Human review must consider the correctness, security, maintainability, and suitability of the proposed changes.",
    ],
  },
  {
    title: "Verification and Testing",
    paras: ["Verification requirements depend on the criticality of the implementation."],
    subsections: [
      {
        title: "7.1 Critical implementations",
        paras: [
          "Critical implementations must not be accepted if a human cannot adequately verify their correctness and security.",
          "Passing automated tests or receiving approval from other AI agents is not sufficient when the human reviewer cannot adequately establish that the implementation is trustworthy.",
        ],
      },
      {
        title: "7.2 Other implementations",
        paras: ["For implementations that are not critical:"],
        items: [
          "Adequate test cases must be used to verify the changes.",
          "Other AI agents may assist with independent verification, test analysis, and identifying potential issues.",
          "The verification process, test results, findings, and any limitations must be documented for future review.",
          "A human maintainer remains responsible for deciding whether the evidence is sufficient to accept the change.",
        ],
      },
    ],
    after: [
      "Verification must be proportionate to the risks and purpose of the implementation. AI-assisted verification does not replace human responsibility.",
    ],
  },
  {
    title: "Decision Documentation",
    paras: [
      "Every project decision made with human involvement in the AI-assisted development process must be documented in the project's decisions.md file.",
      "Decision records must include, where applicable:",
    ],
    items: [
      "The decision made and its context.",
      "The rationale for the decision.",
      "Alternatives considered and why they were not selected, when relevant.",
      "Any caveats, limitations, assumptions, or unresolved concerns.",
      "Relevant verification findings and references for future review.",
    ],
    after: [
      "AI agents must consult relevant existing decisions before working on related tasks. Previously approved decisions must not be silently overridden.",
      "When a decision needs to change, the AI must recommend the change and obtain human approval before proceeding. The updated decision and its rationale must then be recorded.",
    ],
  },
  {
    title: "Unclear, Conflicting, or Unsafe Instructions",
    paras: [
      "When an AI agent encounters unclear, conflicting, incomplete, or potentially unsafe instructions, it must:",
    ],
    ordered: [
      "Stop the affected work.",
      "Explain the problem and its potential consequences.",
      "Recommend an appropriate solution for human consideration.",
      "Wait for human approval before continuing the affected work.",
    ],
    after: [
      "Unrelated work may continue only when it does not depend on the unresolved issue.",
      "AI agents must not resolve significant conflicts by making their own decisions or silently choosing an interpretation that changes the approved plan.",
    ],
  },
  {
    title: "AI Usage Disclosure",
    paras: [
      "OTF does not require mandatory disclosure of AI assistance in every contribution.",
      "However, the absence of a disclosure requirement does not reduce the requirements for human review, verification, approval, or accountability.",
    ],
  },
  {
    title: "AI Tools and External Services",
    paras: [
      "OTF projects may use local AI models, external AI APIs, AI coding assistants, and other AI services, provided their use complies with OTF's existing policies.",
      "AI-assisted development must follow the OTF Privacy Policy, Security Policy, Open Source Policy, and other applicable requirements. Using an AI tool does not create an exemption from privacy, security, licensing, or dependency requirements.",
    ],
  },
  {
    title: "Human-Controlled Releases",
    paras: ["All OTF releases must follow the organization's existing human-controlled release requirements."],
    items: [
      "AI agents may assist with release preparation, testing, documentation, and changelog preparation.",
      "AI agents must never publish or perform a release.",
      "A human must review and perform the release process.",
      "AI-generated release materials must be verified before publication.",
    ],
    after: [
      "AI assistance must not bypass the established review, versioning, testing, or release procedures.",
    ],
  },
  {
    title: "Policy Governance",
    paras: [
      "OTF centrally governs its AI usage requirements and may require corrective action when a project or AI-assisted workflow does not comply with this policy.",
      "Project maintainers are responsible for ensuring that AI-assisted contributions meet applicable requirements. Non-compliant changes must not be accepted until the relevant issues are corrected.",
      "This policy works alongside OTF's existing Open Source, Privacy, Security, and release policies. Those policies continue to govern their respective areas; this policy does not replace them.",
    ],
  },
  {
    title: "Scope and Updates",
    paras: [
      "This policy applies to all current and future OTF projects, repositories, and development workflows that use AI assistance.",
      "OTF may update this policy as its development practices and AI-related risks evolve. The version published on the official OTF website is the authoritative version.",
    ],
  },
];

function Paragraphs({ list }) {
  return list
    ? list.map((p) => (
        <p key={p} class="text-[var(--afw-text-muted)]">
          {p}
        </p>
      ))
    : null;
}

function Bullets({ list, ordered }) {
  return list ? (
    ordered ? (
      <ol class="list-decimal pl-6 space-y-1.5 text-[var(--afw-text-muted)]">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    ) : (
      <ul class="list-disc pl-6 space-y-1.5 text-[var(--afw-text-muted)]">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  ) : null;
}

function Subsection({ title, paras, items }) {
  return (
    <div class="space-y-4">
      <h3 class="pt-2 text-lg font-semibold text-[var(--afw-text)]">{title}</h3>
      <Paragraphs list={paras} />
      <Bullets list={items} />
    </div>
  );
}

export default function AiPolicyPage() {
  return (
    <div class="w-full flex-1 flex flex-col">
      <PolicyHero title="AI Policy" />

      <div class="px-6 py-16 md:py-20">
        <div class="max-w-3xl mx-auto">
          {SECTIONS.map((s, i) => (
            <PolicySection
              key={s.title}
              index={String(i + 1).padStart(2, "0")}
              title={s.title}
            >
              <Paragraphs list={s.paras} />
              <Bullets list={s.items} />
              <Bullets list={s.ordered} ordered />
              {s.subsections
                ? s.subsections.map((sub) => <Subsection key={sub.title} {...sub} />)
                : null}
              <Paragraphs list={s.after} />
            </PolicySection>
          ))}
        </div>
      </div>
    </div>
  );
}
