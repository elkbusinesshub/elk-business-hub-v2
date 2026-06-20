import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `useCdn: true` serves cached, faster responses from Sanity's CDN.
  // Published content is what visitors see, so the CDN is the right default.
  useCdn: true,
});
