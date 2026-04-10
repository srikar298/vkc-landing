import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", [
  "GUEST", "MEMBER_BASIC", "MEMBER_VERIFIED", 
  "EXPERT", "MODERATOR", "SUPER_ADMIN"
]);

export const donorTierEnum = pgEnum("donor_tier", [
  "SILVER", "GOLD", "PATRON"
]);

export const expertCategoryEnum = pgEnum("expert_category", [
  "MEDICAL", "LEGAL", "TECH", "ARCHITECTURE", "ACADEMIC"
]);
