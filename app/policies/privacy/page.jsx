export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy requirements for all Open Tech Foundation websites, applications, software projects, and services — the zero-data-collection principle and how it applies.",
  canonical: "/policies/privacy",
};

const SECTIONS = [
  {
    title: "Purpose",
    paras: [
      "The Open Tech Foundation (OTF) is committed to user privacy. This policy establishes the privacy requirements for all OTF websites, applications, software projects, and services.",
      "OTF follows a zero-data-collection principle. OTF does not collect user data, and its projects must be designed to uphold this principle.",
    ],
  },
  {
    title: "Zero Data Collection",
    paras: ["OTF does not collect user data through its websites, applications, software, or services."],
    items: [
      "Telemetry, analytics, tracking, and diagnostic reporting must not send user data to OTF.",
      "OTF projects must not transmit user data to OTF directly or indirectly, including through embedded libraries or third-party components.",
      "Server-side collection of user activity logs and usage information by OTF is prohibited.",
      "No exceptions are permitted to this principle. Projects that cannot comply must be redesigned.",
    ],
  },
  {
    title: "Local Data Processing and Storage",
    paras: ["OTF projects may process and store user data locally when necessary to provide their intended functionality."],
    items: [
      "Local processing and storage must serve the application's intended functionality.",
      "Locally stored data must not be transmitted to OTF.",
      "Other uses of locally stored user data are permitted only with the user's explicit consent.",
      "Every project that stores user data locally must provide a user-accessible mechanism to delete that data.",
    ],
  },
  {
    title: "External Communication and Services",
    paras: ["OTF projects may communicate with external services when necessary for functionality requested by the user."],
    items: [
      "Projects may include telemetry, analytics, observability, crash-reporting, and diagnostic tools for user-controlled or user-configured external services.",
      "Such tools must not send user data to OTF.",
      "Projects must document their data flows, including local processing, external data transmission, and relevant configuration options.",
      "External communication must serve the functionality requested by the user and must not be used to transmit user data to OTF.",
    ],
  },
  {
    title: "Security and Privacy Vulnerabilities",
    paras: [
      "OTF projects must take reasonable steps to prevent unauthorized access to or disclosure of user data.",
      "Discovered privacy vulnerabilities must be addressed appropriately. Project implementations must be reviewed and, where necessary, corrected to maintain compliance with this policy.",
    ],
  },
  {
    title: "Policy Governance",
    paras: [
      "OTF centrally reviews and approves all privacy-related implementation decisions.",
      "Individual project maintainers must ensure their projects comply with this policy. Privacy-related implementation decisions requiring OTF approval must be submitted for central review.",
      "No project may introduce an exception to the zero-data-collection principle. Any conflicting implementation must be redesigned to comply.",
    ],
  },
  {
    title: "Scope and Updates",
    paras: [
      "This policy applies to all websites, applications, software projects, and services developed, maintained, or operated by the Open Tech Foundation, including future projects.",
      "OTF may update this policy as its requirements evolve. The version published on the official OTF website is the authoritative version.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div class="w-full flex-1 flex flex-col">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            Policy
          </p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            Privacy Policy
          </h1>
        </div>
      </section>

      <div class="px-6 py-16 md:py-20">
        <div class="max-w-3xl mx-auto">
          {SECTIONS.map((s) => (
            <section
              key={s.title}
              class="mt-14 md:mt-20 pt-10 md:pt-14 border-t border-[var(--otfw-border)] first:mt-0 first:pt-0 first:border-0"
            >
              <h2 class="mt-12 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-[var(--otfw-text)]">
                {s.title}
              </h2>
              <div class="space-y-4 text-[var(--otfw-text-muted)] leading-relaxed">
                {s.paras
                  ? s.paras.map((p) => (
                      <p key={p} class="text-[var(--otfw-text-muted)]">
                        {p}
                      </p>
                    ))
                  : null}
                {s.items ? (
                  <ul class="list-disc pl-6 space-y-1.5 text-[var(--otfw-text-muted)]">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
