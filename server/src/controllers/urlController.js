import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import Url from '../models/Url.js';

export const shortenUrl = async (req, res) => {
  let { longUrl, customAlias } = req.body;
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  if (!longUrl) return res.status(400).json({ message: "No URL provided" });
  
  longUrl = longUrl.trim();
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  if (longUrl.includes(baseUrl) || longUrl.includes("localhost:5000")) {
    return res.status(400).json({ message: "Cannot shorten a link from this domain." });
  }

  let urlCode;

  if (customAlias) {
    customAlias = customAlias.trim().replace(/ /g, "-");
    
    const existingAlias = await Url.findOne({ urlCode: customAlias });
    if (existingAlias) {
      return res.status(400).json({ message: "Alias is already taken! Try another." });
    }
    
    urlCode = customAlias;
  } else {
    urlCode = nanoid(8);
  }

  try {
    const shortUrl = `${baseUrl}/${urlCode}`;

    const url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      user: req.user ? req.user.id : null,
      date: new Date()
    });

    await url.save();
    res.json(url);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMyLinks = async (req, res) => {
  try {
    const links = await Url.find({ user: req.user.id }).sort({ date: -1 });
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const linkId = req.params.id;
    const userId = req.user.id; // From Auth Middleware

    console.log(`🗑️ Attempting to delete Link ID: ${linkId}`);
    console.log(`👤 Requested by User ID: ${userId}`);

    const url = await Url.findById(linkId);

    if (!url) {
      console.log("❌ Error: Link not found in Database");
      return res.status(404).json({ message: "URL not found" });
    }

    // Safety Check: Does this link even have an owner?
    if (!url.user) {
      console.log("❌ Error: This is a Guest Link (Cannot delete)");
      return res.status(401).json({ message: "Cannot delete public links" });
    }

    console.log(`🔗 Link Owner ID: ${url.user.toString()}`);

    // Check ownership
    if (url.user.toString() !== userId) {
      console.log("❌ Error: User IDs do not match! (Unauthorized)");
      return res.status(401).json({ message: "Not authorized to delete this" });
    }

    await url.deleteOne();
    console.log("✅ Success: Link Deleted");
    res.json({ message: "URL removed" });
    
  } catch (err) {
    console.error("💥 SERVER CRASH:", err.message);
    res.status(500).json({ message: "Server Error: " + err.message });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ urlCode: code });

    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: "No URL found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};