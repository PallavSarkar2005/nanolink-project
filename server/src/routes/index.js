import express from "express";
import Url from "../models/Url.js";

const router = express.Router();
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      url.clicks++;
      url.date = new Date();
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

export default router;
