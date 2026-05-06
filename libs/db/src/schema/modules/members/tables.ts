import { pgSchema, integer, text, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../iam/users";
import { expertCategoryEnum } from "../../enums/experts";

export const memberSchema = pgSchema("member_mod");

export const profiles = memberSchema.table("profiles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  digitalId: varchar("digital_id", { length: 20 }).unique(),
  isVerified: boolean("is_verified").default(false).notNull(),
  isPaid: boolean("is_paid").default(false).notNull(),
  kula: text("kula").notNull(), // One of the 5 branches
  trade: text("trade").notNull(), // Specific skill/profession
  district: text("district").notNull(),
  state: text("state").default("Telangana").notNull(),
  photoUrl: text("photo_url"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
