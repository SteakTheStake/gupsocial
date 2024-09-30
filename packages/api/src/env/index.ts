import { createEnv } from "@t3-oss/env-core";

import { env as billingEnv } from "@turbostarter/billing/env";
import { env as dbEnv } from "@turbostarter/db/env";

export const env = createEnv({
  extends: [billingEnv, dbEnv],
  runtimeEnv: process.env,
  server: {},
});
