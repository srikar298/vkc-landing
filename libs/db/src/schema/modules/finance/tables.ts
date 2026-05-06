import { pgSchema, integer, varchar, timestamp, jsonb, decimal, text } from "drizzle-orm/pg-core";
import { users } from "../iam/users";
import { transactionStatusEnum, paymentProviderEnum } from "../../enums/finance";

export const financeSchema = pgSchema("finance_mod");

export const transactions = financeSchema.table("transactions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: varchar("public_id", { length: 21 }).notNull().unique(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("INR").notNull(),
  status: transactionStatusEnum("status").default("PENDING").notNull(),
  provider: paymentProviderEnum("provider").notNull(),
  providerTransactionId: varchar("provider_tx_id", { length: 255 }),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const invoices = financeSchema.table("invoices", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: varchar("public_id", { length: 21 }).notNull().unique(),
  transactionId: integer("transaction_id")
    .notNull()
    .references(() => transactions.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  invoiceNumber: varchar("invoice_number", { length: 50 }).notNull().unique(),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
