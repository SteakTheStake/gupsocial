import { defineCollection } from "@content-collections/core";
import { transformMDX } from "@fumadocs/content-collections/configuration";
import slugify from "slugify";

export const legal = defineCollection({
  name: "legal",
  directory: "src/collections/legal/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
  }),
  transform: async (doc, context) => {
    const mdx = await transformMDX(doc, context);

    return {
      ...mdx,
      slug: slugify(doc.title, { lower: true }),
    };
  },
});
