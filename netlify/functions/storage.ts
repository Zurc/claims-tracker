import type { Claim, InsertClaim } from "@shared/schema";

export interface IStorage {
  getAllClaims(): Promise<Claim[]>;
  getClaim(id: number): Promise<Claim | undefined>;
  createClaim(claim: InsertClaim): Promise<Claim>;
  deleteClaim(id: number): Promise<boolean>;
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

  async deleteClaim(id: number): Promise<boolean> {
    const index = this.claims.findIndex((claim) => claim.id === id);
    if (index === -1) {
      return false;
    }
    this.claims.splice(index, 1);
    return true;
  }
}

export const storage = new MemoryStorage();
