import { PostList } from "@opentf/web-docs";
import { posts } from "@opentf/web-docs/posts";

export const metadata = {
  title: "Blog",
  description:
    "Technical writing from the Open Tech Foundation's projects, and news from the Foundation itself.",
  canonical: "/blog",
};

export default function BlogIndex() {
  return (
    <div class="space-y-8">
      <div class="space-y-3">
        <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
          Writing
        </p>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
          Blog
        </h1>
        <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed max-w-2xl">
          Technical writing from the Foundation's projects, and news from the
          Foundation itself.
        </p>
      </div>

      <PostList posts={posts} />
    </div>
  );
}
