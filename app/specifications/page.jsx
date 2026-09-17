import DocLandingSection from "../components/DocLandingSection.jsx";
import { DOC_KINDS } from "../data/projects.js";

export const metadata = {
  title: "Open Specifications",
  description: DOC_KINDS.specifications.blurb,
  canonical: "/specifications",
};

export default function SpecificationsPage() {
  return <DocLandingSection kind={DOC_KINDS.specifications} />;
}