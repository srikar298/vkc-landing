import { pgSchema, integer, text, boolean, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { users } from "../iam/users";

export const matrimonySchema = pgSchema("matrimony_mod");

export const profiles = matrimonySchema.table("profiles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  kula: text("kula").notNull(),
  gotra: text("gotra"),
  star: text("star"),
  raasi: text("raasi"),
  height: varchar("height", { length: 20 }),
  education: text("education"),
  profession: text("profession"),
  income: decimal("income", { precision: 15, scale: 2 }),
  isVerified: boolean("is_verified").default(false).notNull(),
  photoUrls: text("photo_urls").array(),
  horoscopeUrl: text("horoscope_url"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const interactions = matrimonySchema.table("interactions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  senderId: integer("sender_id").notNull().references(() => users.id),
  receiverId: integer("receiver_id").notNull().references(() => users.id),
  type: varchar("type", { length: 20 }).notNull(), // 'LIKE', 'REQUEST', 'BLOCK'
  status: varchar("status", { length: 20 }).default("PENDING").notNull(), // 'PENDING', 'ACCEPTED', 'REJECTED'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
