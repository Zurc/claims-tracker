import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
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

  // Get claim documents
  app.get("/api/claims/:id/documents", async (req, res) => {
    const documents = await storage.getClaimDocuments(parseInt(req.params.id));
    res.json(documents);
  });

  // Add document to claim
  app.post("/api/claims/:id/documents", async (req, res) => {
    const claimId = parseInt(req.params.id);
    const claim = await storage.getClaim(claimId);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    // TODO: Implement actual file upload handling
    // For now, we'll just save the document metadata
    const document = await storage.addDocument({
      claimId,
      fileName: req.body.fileName,
      fileType: req.body.fileType,
      fileUrl: req.body.fileUrl
    });

    res.status(201).json(document);
  });

  const httpServer = createServer(app);
  return httpServer;
}