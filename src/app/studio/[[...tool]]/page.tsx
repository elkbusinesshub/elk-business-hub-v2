// The embedded Sanity Studio. Visiting /studio renders the full CMS admin UI.
// The catch-all `[[...tool]]` segment lets the Studio handle its own routing.
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
