const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log(" No token provided in header");
    return res.status(401).json({ error: "No token provided" });
  }

  console.log(" Token Received:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("🔍 JWT Error:", err.message);
      if (err.name === "TokenExpiredError") {
        const expiredAt = jwt.decode(token)?.exp;
        console.log(" Token Expired At:", new Date(expiredAt * 1000));
        console.log(" Now:", new Date());
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    console.log(" Decoded:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = auth;
