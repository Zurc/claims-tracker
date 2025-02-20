// <root dir>/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";
import { storage } from "./storage";

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

api.use("/api/", router);

export const handler = serverless(api);
