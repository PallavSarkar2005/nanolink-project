import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  let tokenString = authHeader;
  if (tokenString.startsWith("Bearer ")) {
    tokenString = tokenString.slice(7, tokenString.length).trim();
  }
  
  if (tokenString.startsWith('"') && tokenString.endsWith('"')) {
    tokenString = tokenString.slice(1, -1);
  }

  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;