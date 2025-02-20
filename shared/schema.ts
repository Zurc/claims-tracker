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
  dateOfIncident: string;
  description: string;
  status: ClaimStatus;
  dateSubmitted: Date;
}

export const insertClaimSchema = z.object({
  claimType: z.string(),
  // dateOfIncident: z.string().transform((str) => new Date(str)),
  dateOfIncident: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
  // .transform((str) => new Date(str)),
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
