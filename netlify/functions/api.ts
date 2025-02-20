// <root dir>/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";
import { storage } from "../../server/storage";
import { insertClaimSchema } from "../../shared/schema";

const api = express();

const router = Router();

router.get("/hello", (req, res) => res.send("Hello World!"));

// Get all claims
router.get("/api/claims", async (_req, res) => {
  const claims = await storage.getAllClaims();
  res.json(claims);
});

// Get single claim
// router.get("/api/claims/:id", async (req, res) => {
//   const claim = await storage.getClaim(parseInt(req.params.id));
//   if (!claim) {
//     return res.status(404).json({ message: "Claim not found" });
//   }
//   res.json(claim);
// });

// Create new claim
// router.post("/api/claims", async (req, res) => {
//   const parseResult = insertClaimSchema.safeParse(req.body);
//   if (!parseResult.success) {
//     return res.status(400).json({ message: "Invalid claim data" });
//   }

//   const claim = await storage.createClaim(parseResult.data);
//   res.status(201).json(claim);
// });

api.use("/api/", router);

export const handler = serverless(api);
