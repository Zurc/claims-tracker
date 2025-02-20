import type { Express } from "express";
import { createServer } from "http";
import { storage } from "../netlify/functions/storage";
import { insertClaimSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Get all claims
  app.get("/api/claims", async (_req, res) => {
    const claims = await storage.getAllClaims();
    res.json(claims);
  });

  // Get single claim
  app.get("/api/claims/:id", async (req, res) => {
    const claim = await storage.getClaim(parseInt(req.params.id));
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    res.json(claim);
  });

  // Create new claim
  app.post("/api/claims", async (req, res) => {
    const parseResult = insertClaimSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: "Invalid claim data" });
    }

    const claim = await storage.createClaim(parseResult.data);
    res.status(201).json(claim);
  });

  const httpServer = createServer(app);
  return httpServer;
}
