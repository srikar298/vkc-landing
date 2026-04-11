import { pgEnum } from "drizzle-orm/pg-core";

export const expertCategoryEnum = pgEnum("expert_category", [
  "MEDICAL",
  "LEGAL",
  "TECH",
  "ARCHITECTURE",
  "ACADEMIC",
]);
