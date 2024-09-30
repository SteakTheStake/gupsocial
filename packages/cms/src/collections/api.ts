import { allBlogs, allLegals } from "../../.content-collections/generated";
import { COLLECTION_TYPE } from "../constants";

export const content = {
  [COLLECTION_TYPE.LEGAL]: allLegals,
  [COLLECTION_TYPE.BLOG]: allBlogs,
} as const;
