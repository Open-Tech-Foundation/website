import DocIndexSection from "../../components/DocIndexSection.jsx";
import { divisions, DOC_KINDS } from "../../data/projects.js";

const DIVISION = divisions.find((d) => d.id === "hardware");
const KIND = DOC_KINDS.specifications;

export const metadata = {
  title: "Hardware Specifications",
  description: KIND.blurb,
  canonical: "/specifications/hardware",
};

export default function HardwareSpecificationsPage() {
  return (
    <DocIndexSection
      division={DIVISION}
      kind={KIND}
      items={KIND.items("hardware")}
    />
  );
}
