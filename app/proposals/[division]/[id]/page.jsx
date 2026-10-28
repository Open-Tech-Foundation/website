import { proposals } from "../../../data/projects.js";
import DocPage from "../../../components/DocPage.jsx";

// One page per proposal at /proposals/<division>/<id>. `getStaticPaths` enumerates
// them so `esdev build` (site-ssg target) pre-renders each with its own <head>;
// without it a dynamic route produces no static HTML and the URL answers 404 to
// crawlers even though it renders client-side.
export function getStaticPaths() {
  return proposals.map((p) => ({ params: { division: p.division, id: p.id } }));
}

export function generateMetadata({ params }) {
  const doc = proposals.find((p) => p.division === params.division && p.id === params.id);
  if (!doc) return { title: "Proposal not found", robots: "noindex" };

  return {
    title: doc.title,
    description: doc.summary,
    canonical: `/proposals/${doc.division}/${doc.id}`,
    openGraph: { title: doc.title, description: doc.summary },
  };
}

export default function ProposalDoc() {
  return <DocPage />;
}
