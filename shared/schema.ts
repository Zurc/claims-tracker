import { pgTable, text, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const claims = pgTable("claims", {
  id: serial("id").primaryKey(),
  claimType: varchar("claim_type", { length: 100 }).notNull(),
  dateOfIncident: timestamp("date_of_incident").notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("Submitted"),
  dateSubmitted: timestamp("date_submitted").notNull().default(new Date()),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  claimId: integer("claim_id").notNull().references(() => claims.id),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 50 }).notNull(),
  fileUrl: text("file_url").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().default(new Date()),
});

export const claimRelations = relations(claims, ({ many }) => ({
  documents: many(documents),
}));

export const documentRelations = relations(documents, ({ one }) => ({
  claim: one(claims, {
    fields: [documents.claimId],
    references: [claims.id],
  }),
}));

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

export const insertDocumentSchema = createInsertSchema(documents, {
  uploadedAt: z.date().optional(),
}).omit({
  id: true,
  uploadedAt: true,
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
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;