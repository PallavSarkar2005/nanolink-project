import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // 1. Get token from header
  const token = req.header("Authorization");

  // 2. If no token, they are a "Guest" (allow them to pass, but as null)
  if (!token) {
    req.user = null;
    return next();
  }

  // 3. Verify token
  try {
    // Remove "Bearer " from string
    const tokenString = token.replace("Bearer ", "");
    
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET || "secretKey123");
    req.user = decoded; // Attach user ID to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;