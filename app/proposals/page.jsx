import DocLandingSection from "../components/DocLandingSection.jsx";
import { DOC_KINDS } from "../data/projects.js";

export const metadata = {
  title: "Open Proposals",
  description: DOC_KINDS.proposals.blurb,
  canonical: "/proposals",
};

export default function ProposalsPage() {
  return <DocLandingSection kind={DOC_KINDS.proposals} />;
}