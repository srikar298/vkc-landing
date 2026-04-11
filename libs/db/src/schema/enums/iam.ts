import { pgEnum } from "drizzle-orm/pg-core";
import { UserRole } from "@vishwakarma-k-c/shared";

export const roleEnum = pgEnum("user_role", [
  UserRole.GUEST,
  UserRole.MEMBER_BASIC,
  UserRole.MEMBER_VERIFIED,
  UserRole.EXPERT,
  UserRole.MODERATOR,
  UserRole.ADMIN,
  UserRole.SUPER_ADMIN,
]);
