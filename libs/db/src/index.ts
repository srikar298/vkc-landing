import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "@vishwakarma-k-c/shared";

// Unified schema object for Drizzle initialization (Internal & Migrations)
import * as iamEnums from "./schema/enums/iam";
import * as expertEnums from "./schema/enums/experts";
import * as commonEnums from "./schema/enums/common";
import * as iam from "./schema/modules/iam";
import * as members from "./schema/modules/members";
import * as shared from "./schema/modules/shared";

export const schema = {
  ...iamEnums,
  ...expertEnums,
  ...commonEnums,
  ...iam,
  ...members,
  ...shared,
};

// Database connection
const queryClient = postgres(config.db.url, {
  onnotice: () => {},
});

export const db = drizzle(queryClient, { schema });

// Global Enums & Constants
export * from "./schema/enums/iam";
export * from "./schema/enums/experts";
export * from "./schema/enums/common";

// NOTE: Domain tables are now exported via modular paths:
// @vishwakarma-k-c/db/iam
// @vishwakarma-k-c/db/members
// @vishwakarma-k-c/db/shared
