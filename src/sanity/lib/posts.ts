import { client } from "../client";
import type { Post, PostListItem } from "../types";
import { POSTS_QUERY, POST_QUERY, POSTS_SLUGS_QUERY } from "./queries";

// Revalidate cached blog data every 60 seconds so newly published posts
// appear without a redeploy.
const options = { next: { revalidate: 60 } };

// Each helper fails soft: if Sanity isn't configured yet (or is unreachable),
// the site still renders an empty blog instead of crashing.

export async function getPosts(): Promise<PostListItem[]> {
  try {
    return await client.fetch(POSTS_QUERY, {}, options);
  } catch (err) {
    console.error("Failed to fetch posts from Sanity:", err);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(POST_QUERY, { slug }, options);
  } catch (err) {
    console.error(`Failed to fetch post "${slug}" from Sanity:`, err);
    return null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const rows = await client.fetch<{ slug: string }[]>(POSTS_SLUGS_QUERY);
    return rows.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}
