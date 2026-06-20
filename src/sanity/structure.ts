import type { StructureResolver } from "sanity/structure";

// Sidebar layout for the Studio: Posts, Authors, and Categories.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("category").title("Categories"),
    ]);
