import { BlogLayout } from "@opentf/afw-docs";
import { posts } from "@opentf/afw-docs/posts";
import config from "../../afw.config.js";

// Blog-wide SEO. Every blog route is a post except the index, which sets its own
// `openGraph.type` back to "website". `links` replaces rather than merges, so the
// feed autodiscovery links are appended to the parent's (the site icons).
export async function generateMetadata(_, parent) {
  const { links = [] } = await parent;
  return {
    openGraph: { type: "article" },
    links: [
      ...links,
      { rel: "alternate", type: "application/rss+xml", href: "/blog/rss.xml" },
      { rel: "alternate", type: "application/atom+xml", href: "/blog/atom.xml" },
    ],
  };
}

// The blog section's shell. `frame={false}` because the navbar and footer already come
// from the root app/layout.jsx — BlogLayout would otherwise render its own set. On a
// post it adds the banner and an "On this page" TOC; on the index it just renders the
// children. `siteUrl` makes the post's BlogPosting JSON-LD URLs absolute.
export default function BlogSectionLayout(props) {
  return (
    <BlogLayout config={config.docs} posts={posts} siteUrl={config.site.url} frame={false}>
      {props.children}
    </BlogLayout>
  );
}
