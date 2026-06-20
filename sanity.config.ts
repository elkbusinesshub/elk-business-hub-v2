"use client";

// Configuration for the embedded Sanity Studio, mounted at `/studio`.
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schema } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision lets you run GROQ queries against your dataset from the Studio.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
