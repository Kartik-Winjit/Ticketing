import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "@kgtix/common";
import { log } from "console";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
