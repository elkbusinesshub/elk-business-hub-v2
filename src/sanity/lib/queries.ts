import { defineQuery } from "next-sanity";

// All published posts, newest first — for the /blog listing page.
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    "categories": categories[]->title,
    "author": author->{ name, image }
  }
`);

// A single post by its slug — for the /blog/[slug] detail page.
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    body,
    "categories": categories[]->title,
    "author": author->{ name, image, bio }
  }
`);

// Just the slugs — used to pre-render post pages at build time.
export const POSTS_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);
