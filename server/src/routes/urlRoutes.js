import express from "express";
import { shortenUrl, getMyLinks,deleteUrl } from "../controllers/urlController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/shorten", authMiddleware, shortenUrl);
router.get("/my-links", authMiddleware, getMyLinks);
router.delete("/:id", authMiddleware, deleteUrl);

export default router;