import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type PostAuthor = {
  name: string;
  image?: SanityImageSource;
  bio?: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImageSource;
  categories?: string[];
  author?: Pick<PostAuthor, "name" | "image">;
};

export type Post = PostListItem & {
  body?: PortableTextBlock[];
  author?: PostAuthor;
};
