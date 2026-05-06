import { pgEnum } from "drizzle-orm/pg-core";

export const transactionStatusEnum = pgEnum("transaction_status", [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "REFUNDED",
]);

export const paymentProviderEnum = pgEnum("payment_provider", [
  "RAZORPAY",
  "STRIPE",
  "OFFLINE",
]);
