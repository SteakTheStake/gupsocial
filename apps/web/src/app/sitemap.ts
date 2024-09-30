import { content } from "@turbostarter/cms";

import { BLOG_PREFIX } from "~/config/paths";
import { publicUrl } from "~/lib/env";

import type { MetadataRoute } from "next";

const url = (path: string) => new URL(path, publicUrl).toString();

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Promise.resolve([
    {
      url: url("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...content.blog.map<MetadataRoute.Sitemap[number]>((blog) => ({
      url: url(`${BLOG_PREFIX}/${blog.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ]);
}
