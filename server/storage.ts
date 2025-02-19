import type { Claim, InsertClaim } from "@shared/schema";

export interface IStorage {
  getAllClaims(): Promise<Claim[]>;
  getClaim(id: number): Promise<Claim | undefined>;
  createClaim(claim: InsertClaim): Promise<Claim>;
}

export class MemStorage implements IStorage {
  private claims: Map<number, Claim>;
  private currentId: number;

  constructor() {
    this.claims = new Map();
    this.currentId = 1;

    // Add some sample claims
    const sampleClaims: InsertClaim[] = [
      {
        claimType: "Broken Phone Screen",
        dateOfIncident: new Date("2024-01-15"),
        description: "Phone slipped from hand and screen cracked"
      },
      {
        claimType: "Minor Car Dent",
        dateOfIncident: new Date("2024-01-20"),
        description: "Small dent on passenger door from shopping cart"
      }
    ];

    sampleClaims.forEach(claim => {
      this.createClaim(claim);
    });
  }

  async getAllClaims(): Promise<Claim[]> {
    return Array.from(this.claims.values());
  }

  async getClaim(id: number): Promise<Claim | undefined> {
    return this.claims.get(id);
  }

  async createClaim(insertClaim: InsertClaim): Promise<Claim> {
    const id = this.currentId++;
    const claim: Claim = {
      ...insertClaim,
      id,
      status: "Submitted",
      dateSubmitted: new Date()
    };
    this.claims.set(id, claim);
    return claim;
  }
}

export const storage = new MemStorage();
