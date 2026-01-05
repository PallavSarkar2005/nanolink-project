import express from "express";
import { shortenUrl, getMyLinks } from "../controllers/urlController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // <--- Import this

const router = express.Router();

// Apply middleware so we know WHO is making the request
router.post("/shorten", authMiddleware, shortenUrl);

// New Route: Get only MY links (Protected)
router.get("/my-links", authMiddleware, getMyLinks);

export default router;