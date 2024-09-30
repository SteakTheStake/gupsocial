import { createMDXSource } from "@fumadocs/content-collections";
import { loader } from "fumadocs-core/source";

import { content } from "@turbostarter/cms";

import { BLOG_PREFIX } from "~/config/paths";

export const { getPage, getPages, generateParams, pageTree } = loader({
  baseUrl: BLOG_PREFIX,
  source: createMDXSource(content.blog, []),
});
