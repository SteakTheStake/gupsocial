import { createMDXSource } from "@fumadocs/content-collections";
import { loader } from "fumadocs-core/source";

import { content } from "@turbostarter/cms";

import { LEGAL_PREFIX } from "~/config/paths";

export const { getPage, getPages, generateParams, pageTree } = loader({
  baseUrl: LEGAL_PREFIX,
  source: createMDXSource(content.legal, []),
});
