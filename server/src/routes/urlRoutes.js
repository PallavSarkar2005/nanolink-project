import express from "express";
import { shortenUrl, getMyLinks, deleteUrl, getDashboardStats, redirectUrl } from "../controllers/urlController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/shorten", authMiddleware, shortenUrl);
router.get("/my-links", authMiddleware, getMyLinks);
router.get("/stats", authMiddleware, getDashboardStats);
router.delete("/:id", authMiddleware, deleteUrl);
router.get("/:code", redirectUrl);

export default router;