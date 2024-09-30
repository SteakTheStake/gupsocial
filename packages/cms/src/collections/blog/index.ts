import { defineCollection } from "@content-collections/core";
import { transformMDX } from "@fumadocs/content-collections/configuration";
import slugify from "slugify";

export const blog = defineCollection({
  name: "blog",
  directory: "src/collections/blog/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()),
  }),
  transform: async (doc, context) => {
    const mdx = await transformMDX(doc, context);

    return {
      ...mdx,
      slug: slugify(doc.title, { lower: true }),
    };
  },
});
