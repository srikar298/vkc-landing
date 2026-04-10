import { pgSchema, integer, text, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";
import { expertCategoryEnum } from "./enums";

export const memberSchema = pgSchema("member_mod");

export const profiles = memberSchema.table("profiles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  isVerified: boolean("is_verified").default(false).notNull(),
  trade: text("trade").notNull(),
  district: text("district").notNull(),
});

export const professionalProfiles = memberSchema.table("professional_profiles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  profileId: integer("profile_id").notNull().references(() => profiles.id),
  category: expertCategoryEnum("category").notNull(),
  experienceYears: integer("experience_years").notNull(),
  bio: text("bio"),
});
