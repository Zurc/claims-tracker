import { z } from "zod";

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
  "Natural Disaster",
] as const;

export interface Claim {
  id: number;
  claimType: string;
  dateOfIncident: Date;
  description: string;
  status: ClaimStatus;
  dateSubmitted: Date;
}

export const insertClaimSchema = z.object({
  claimType: z.string(),
  dateOfIncident: z.string().transform((str) => new Date(str)),
  description: z.string().min(1, "Description is required"),
});

export const claimStatusSchema = z.enum([
  "Submitted",
  "Under Review",
  "Approved",
  "Denied",
]);

export type ClaimStatus = z.infer<typeof claimStatusSchema>;
export type InsertClaim = z.infer<typeof insertClaimSchema>;
