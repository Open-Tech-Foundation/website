import { specifications } from "../../../data/projects.js";
import DocPage from "../../../components/DocPage.jsx";

// One page per specification at /specifications/<division>/<id>. `getStaticPaths`
// enumerates them so `esdev build` (site-ssg target) pre-renders each with its own
// <head>; without it a dynamic route produces no static HTML and the URL answers
// 404 to crawlers even though it renders client-side.
export function getStaticPaths() {
  return specifications.map((s) => ({ params: { division: s.division, id: s.id } }));
}

export function generateMetadata({ params }) {
  const doc = specifications.find(
    (s) => s.division === params.division && s.id === params.id,
  );
  if (!doc) return { title: "Specification not found", robots: "noindex" };

  return {
    title: doc.title,
    description: doc.summary,
    canonical: `/specifications/${doc.division}/${doc.id}`,
    openGraph: { title: doc.title, description: doc.summary },
  };
}

export default function SpecificationDoc() {
  return <DocPage />;
}
