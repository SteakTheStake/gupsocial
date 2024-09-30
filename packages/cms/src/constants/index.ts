import type { z } from "zod";

export const COLLECTION_TYPE = {
  LEGAL: "legal",
  BLOG: "blog",
} as const;

export type CollectionType =
  (typeof COLLECTION_TYPE)[keyof typeof COLLECTION_TYPE];

export const createMetaSchema = (zod: typeof z) => ({
  title: zod.string().optional(),
  pages: zod.array(zod.string()).optional(),
  icon: zod.string().optional(),
  root: zod.boolean().optional(),
  defaultOpen: zod.boolean().optional(),
});
