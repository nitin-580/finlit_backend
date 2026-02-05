const jwt = require("jsonwebtoken");
const User = require("../../../auth/model/user.model");

async function authMiddleware(req, res, next) {
  try {
    // 1️⃣ Get token from cookie or header
    let token = req.cookies?.accessToken;

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // Bearer token
    }

    if (!token) {
      return res.status(401).json({ message: "Access denied. Login required." });
    }

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 3️⃣ Fetch user and attach to req
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists." });
    }

    req.user = user; // attach authenticated user
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
}

module.exports = { authMiddleware };