import { BlogLayout } from "@opentf/afw-docs";
import { posts } from "@opentf/afw-docs/posts";
import config from "../../afw.config.js";

// The blog section's shell. `frame={false}` because the navbar and footer already come
// from the root app/layout.jsx — BlogLayout would otherwise render its own set. On a
// post it adds the banner and an "On this page" TOC; on the index it just renders the
// children.
export default function BlogSectionLayout(props) {
  return (
    <BlogLayout config={config.docs} posts={posts} frame={false}>
      {props.children}
    </BlogLayout>
  );
}
