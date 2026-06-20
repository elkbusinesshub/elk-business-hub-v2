import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { getPosts } from "@/sanity/lib/posts";
import { urlFor } from "@/sanity/image";
import type { PostListItem } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Blog – ELK Business Hub",
  description:
    "News, guides, and stories from ELK Business Hub — Kerala's rent, hire, and business portal.",
  alternates: { canonical: "/blog" },
};

function formatDate(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PostCard({ post }: { post: PostListItem }) {
  const cover = post.coverImage
    ? urlFor(post.coverImage).width(800).height(450).fit("crop").url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-[18px] overflow-hidden shadow-[var(--shadow-soft)] no-underline transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-[16/9] bg-beige-mid overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-teal/40 text-4xl">
            ✎
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        {post.categories?.[0] && (
          <span className="self-start bg-teal-light text-teal text-[0.7rem] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-3">
            {post.categories[0]}
          </span>
        )}
        <h2 className="font-serif font-black text-[1.2rem] text-ink leading-snug mb-2 group-hover:text-teal transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-ink-soft text-[0.9rem] leading-[1.7] mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-2 text-[0.78rem] text-ink-soft">
          {post.author?.name && (
            <>
              <span className="font-semibold text-ink">{post.author.name}</span>
              <span>·</span>
            </>
          )}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-[5%] max-w-[1200px] mx-auto">
        <div className="mb-12 pt-4">
          <div className="inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3">
            — The ELK Blog
          </div>
          <h1 className="font-serif font-black text-[clamp(2rem,4vw,2.8rem)] text-ink leading-tight mb-3">
            Stories, Guides &amp; Updates
          </h1>
          <p className="text-ink-soft text-[1rem] max-w-[560px]">
            Insights on renting, hiring, and growing your business across Kerala
            and beyond.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-[18px] p-12 text-center shadow-[var(--shadow-soft)]">
            <div className="text-4xl mb-3">📝</div>
            <h2 className="font-bold text-[1.1rem] text-ink mb-2">
              No posts yet
            </h2>
            <p className="text-ink-soft text-[0.9rem]">
              Check back soon — we&apos;re working on our first stories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
