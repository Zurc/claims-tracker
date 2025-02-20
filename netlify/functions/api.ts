// <root dir>/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";
import { storage } from "./storage";
import { insertClaimSchema } from "./schema";

const api = express();

const router = Router();

router.get("/hello", (req, res) => res.send("Hello World!"));

// Get all claims
router.get("/claims", async (_req, res) => {
  try {
    const claims = await storage.getAllClaims();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve claims" });
  }
});

// Get single claim
router.get("/claims/:id", async (req, res) => {
  const claim = await storage.getClaim(parseInt(req.params.id));
  if (!claim) {
    return res.status(404).json({ message: "Claim not found" });
  }
  res.json(claim);
});

// Create new claim
router.post("/claims", async (req, res) => {
  try {
    const parseResult = insertClaimSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: "Invalid claim data" });
    }

    const claim = await storage.createClaim(parseResult.data);
    res.status(201).json(claim);
  } catch (error) {
    console.error("Error creating claim:", error);
    res.status(500).json({ message: "Failed to create claim" });
  }
});

api.use("/api/", router);

export const handler = serverless(api);
