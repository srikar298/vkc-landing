import { pgEnum } from "drizzle-orm/pg-core";

export const donorTierEnum = pgEnum("donor_tier", ["SILVER", "GOLD", "PATRON"]);
