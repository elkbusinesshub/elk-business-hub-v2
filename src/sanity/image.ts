import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Build a CDN URL for a Sanity image reference.
// e.g. urlFor(post.coverImage).width(800).height(450).url()
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
