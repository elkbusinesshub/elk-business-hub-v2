import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ArticleView from "@/components/ArticleView";
import { getPost, getPostSlugs } from "@/sanity/lib/posts";
import { urlFor } from "@/sanity/image";

// Pre-render a static page for each existing post at build time.
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found – ELK Business Hub" };

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${post.title} – ELK Business Hub`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: ogImage
      ? { title: post.title, description: post.excerpt, images: [ogImage] }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const cover = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
    : null;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-[5%] max-w-[760px] mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-[0.85rem] font-bold text-ink-soft hover:text-teal transition-colors no-underline mb-8"
        >
          ← Back to Blog
        </Link>

        <ArticleView
          title={post.title}
          body={post.body}
          coverUrl={cover}
          categories={post.categories}
          authorName={post.author?.name}
          publishedAt={post.publishedAt}
        />
      </main>
      <Footer />
    </>
  );
}
