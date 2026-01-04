import express from "express";
import { nanoid } from "nanoid";
import validUrl from "valid-url";
import Url from "../models/Url.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  const urlCode = nanoid(8);

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long URL");
  }
});

export default router;
