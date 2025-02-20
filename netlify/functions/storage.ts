import type { Claim, InsertClaim } from "@shared/schema";

export interface IStorage {
  getAllClaims(): Promise<Claim[]>;
  getClaim(id: number): Promise<Claim | undefined>;
  createClaim(claim: InsertClaim): Promise<Claim>;
}

export class MemoryStorage implements IStorage {
  private claims: Claim[] = [];
  private nextId = 1;

  async getAllClaims(): Promise<Claim[]> {
    return this.claims;
  }

  async getClaim(id: number): Promise<Claim | undefined> {
    return this.claims.find((claim) => claim.id === id);
  }

  async createClaim(insertClaim: InsertClaim): Promise<Claim> {
    const claim: Claim = {
      id: this.nextId++,
      ...insertClaim,
      status: "Submitted",
      dateSubmitted: new Date(),
    };
    this.claims.push(claim);
    return claim;
  }
}

export const storage = new MemoryStorage();
