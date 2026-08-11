import DocIndexSection from "../../components/DocIndexSection.jsx";
import { divisions, DOC_KINDS } from "../../data/projects.js";

const DIVISION = divisions.find((d) => d.id === "software");
const KIND = DOC_KINDS.specifications;

export const metadata = {
  title: "Software Specifications",
  description: KIND.blurb,
  canonical: "/specifications/software",
};

export default function SoftwareSpecificationsPage() {
  return (
    <DocIndexSection
      division={DIVISION}
      kind={KIND}
      items={KIND.items("software")}
    />
  );
}
