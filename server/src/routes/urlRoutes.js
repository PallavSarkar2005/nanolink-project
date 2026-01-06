import express from "express";
import { shortenUrl, getMyLinks, deleteUrl, getDashboardStats } from "../controllers/urlController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/shorten", authMiddleware, shortenUrl);
router.get("/my-links", authMiddleware, getMyLinks);
router.delete("/:id", authMiddleware, deleteUrl);
router.get("/stats", authMiddleware, getDashboardStats);

export default router;