import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

// Used by the Sanity CLI (e.g. `npx sanity deploy`, `npx sanity dataset ...`).
export default defineCliConfig({
  api: { projectId, dataset },
  // Keeps the Studio bundle from picking up the Next.js config.
  studioHost: undefined,
});
