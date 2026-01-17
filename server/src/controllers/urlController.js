import { nanoid } from "nanoid";
import validUrl from "valid-url";
import Url from "../models/Url.js";

export const shortenUrl = async (req, res) => {
  let { longUrl, customAlias } = req.body;
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  if (!longUrl) return res.status(400).json({ message: "No URL provided" });

  longUrl = longUrl.trim();
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  if (longUrl.includes(baseUrl) || longUrl.includes("localhost")) {
    return res
      .status(400)
      .json({ message: "Cannot shorten a link from this domain." });
  }

  let urlCode;

  if (customAlias) {
    customAlias = customAlias.trim().replace(/ /g, "-");

    const existingAlias = await Url.findOne({ urlCode: customAlias });
    if (existingAlias) {
      return res
        .status(400)
        .json({ message: "Alias is already taken! Try another." });
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
      date: new Date(),
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
    const userId = req.user.id;

    const url = await Url.findById(linkId);

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (!url.user) {
      return res.status(401).json({ message: "Cannot delete public links" });
    }

    if (url.user.toString() !== userId) {
      return res.status(401).json({ message: "Not authorized to delete this" });
    }

    await url.deleteOne();
    res.json({ message: "URL removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
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

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const urls = await Url.find({ user: userId });

    const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
    const totalLinks = urls.length;

    const sortedLinks = [...urls].sort((a, b) => b.clicks - a.clicks);
    const topLink = sortedLinks.length > 0 ? sortedLinks[0] : null;

    res.json({
      totalClicks,
      totalLinks,
      topLinkAlias: topLink ? topLink.urlCode : "None",
      topLinkClicks: topLink ? topLink.clicks : 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
