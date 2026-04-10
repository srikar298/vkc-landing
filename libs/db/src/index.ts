import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as enums from "./schema/enums";
import * as users from "./schema/users";
import * as members from "./schema/members";
import * as permissions from "./schema/permissions";

import { config } from "@vishwakarma-k-c/shared";

const schema = {
  ...enums,
  ...users,
  ...members,
  ...permissions,
};

// Database connection string is now validated via the shared config
const queryClient = postgres(config.DATABASE_URL, {
  onnotice: () => {},
  // Ensure the isolated schema is in the search path for resolving relations
  options: "-c search_path=auth_mod,public",
});
export const db = drizzle(queryClient, { schema });

export * from "./schema/enums";
export * from "./schema/users";
export * from "./schema/members";
// Add other schemas as they are developed
