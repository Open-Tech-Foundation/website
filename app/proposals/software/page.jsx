import DocIndexSection from "../../components/DocIndexSection.jsx";
import { divisions, DOC_KINDS } from "../../data/projects.js";

const DIVISION = divisions.find((d) => d.id === "software");
const KIND = DOC_KINDS.proposals;

export const metadata = {
  title: "Software Proposals",
  description: KIND.blurb,
  canonical: "/proposals/software",
};

export default function SoftwareProposalsPage() {
  return (
    <DocIndexSection
      division={DIVISION}
      kind={KIND}
      items={KIND.items("software")}
    />
  );
}
