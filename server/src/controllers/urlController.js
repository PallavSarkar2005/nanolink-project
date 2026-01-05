import Url from "../models/Url.js";
import { nanoid } from "nanoid";
import validUrl from "valid-url";

// 1. SHORTEN URL
export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  // Create url code
  const urlCode = nanoid(8);

  if (validUrl.isUri(longUrl)) {
    try {
      // Check if URL already exists for THIS user? 
      // (Optional: For now, we create a new one every time)

      const shortUrl = `${baseUrl}/${urlCode}`;

      const url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        user: req.user ? req.user.id : null, // <--- SAVE USER ID HERE
        date: new Date()
      });

      await url.save();
      res.json(url);

    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid long URL");
  }
};

// 2. GET USER'S LINKS (For Dashboard)
export const getMyLinks = async (req, res) => {
  try {
    // If no user is logged in, return empty
    if (!req.user) return res.json([]);

    // Find links belonging to this user
    const urls = await Url.find({ user: req.user.id }).sort({ date: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};