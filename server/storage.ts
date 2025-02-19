import type { Claim, InsertClaim, Document, InsertDocument } from "@shared/schema";
import { claims, documents } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllClaims(): Promise<Claim[]>;
  getClaim(id: number): Promise<Claim | undefined>;
  createClaim(claim: InsertClaim): Promise<Claim>;
  getClaimDocuments(claimId: number): Promise<Document[]>;
  addDocument(document: InsertDocument): Promise<Document>;
}

export class DatabaseStorage implements IStorage {
  async getAllClaims(): Promise<Claim[]> {
    return await db.select().from(claims);
  }

  async getClaim(id: number): Promise<Claim | undefined> {
    const [claim] = await db.select().from(claims).where(eq(claims.id, id));
    return claim;
  }

  async createClaim(insertClaim: InsertClaim): Promise<Claim> {
    const [claim] = await db
      .insert(claims)
      .values(insertClaim)
      .returning();
    return claim;
  }

  async getClaimDocuments(claimId: number): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.claimId, claimId));
  }

  async addDocument(document: InsertDocument): Promise<Document> {
    const [newDocument] = await db
      .insert(documents)
      .values(document)
      .returning();
    return newDocument;
  }
}

export const storage = new DatabaseStorage();