import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const claims = pgTable("claims", {
  id: serial("id").primaryKey(),
  claimType: varchar("claim_type", { length: 100 }).notNull(),
  dateOfIncident: timestamp("date_of_incident").notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("Submitted"),
  dateSubmitted: timestamp("date_submitted").notNull().default(new Date()),
});

export const claimTypes = [
  "Auto Collision",
  "Auto Theft",
  "Water Damage - Home",
  "Fire Damage - Home",
  "Roof Damage",
  "Personal Property Theft",
  "Medical Expense",
  "Personal Injury",
  "Mobile Device Damage",
  "Natural Disaster"
] as const;

export const insertClaimSchema = createInsertSchema(claims, {
  dateOfIncident: z.string().transform((str) => new Date(str))
}).omit({ 
  id: true,
  dateSubmitted: true,
  status: true
});

export const claimStatusSchema = z.enum([
  "Submitted",
  "Under Review",
  "Approved", 
  "Denied"
]);

export type ClaimStatus = z.infer<typeof claimStatusSchema>;
export type InsertClaim = z.infer<typeof insertClaimSchema>;
export type Claim = typeof claims.$inferSelect;