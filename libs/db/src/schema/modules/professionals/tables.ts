import { pgSchema, integer, text, timestamp } from "drizzle-orm/pg-core";
import { profiles } from "../members/tables";
import { expertCategoryEnum } from "../../enums/experts";

export const professionalSchema = pgSchema("professionals_mod");

export const professionalProfiles = professionalSchema.table("profiles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  memberProfileId: integer("member_profile_id").notNull().references(() => profiles.id),
  category: expertCategoryEnum("category").notNull(),
  experienceYears: integer("experience_years").notNull(),
  bio: text("bio"),
  portfolioUrls: text("portfolio_urls").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
