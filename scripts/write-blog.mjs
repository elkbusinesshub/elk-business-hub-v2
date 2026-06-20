// Creates the seed docs directly via @sanity/client, using the token saved by
// `sanity login`. Bypasses the CLI's TS-config loader.
// Safe to delete this file after the post is created.
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createClient } from "@sanity/client";

const cfg = JSON.parse(
  readFileSync(join(homedir(), ".config", "sanity", "config.json"), "utf8"),
);

const client = createClient({
  projectId: "te3uxewd",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: cfg.authToken,
  useCdn: false,
});

const read = (name) =>
  JSON.parse(readFileSync(join(import.meta.dirname, "_seed", name), "utf8"));

const category = read("category.json");
const author = read("author.json");
const post = read("post.json");

const run = async () => {
  await client.createOrReplace(category);
  console.log("✓ category:", category._id);
  await client.createOrReplace(author);
  console.log("✓ author:  ", author._id);
  await client.createOrReplace(post);
  console.log("✓ draft post:", post._id);
  console.log("\nDone. Open /studio to review, add images, and Publish.");
};

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
