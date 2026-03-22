import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  // 1. Get the token from the header, query, or body (supports your current frontend setup)
  const token =
    req.headers.authorization?.split(" ")[1] ||
    req.query.token ||
    req.body.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // 2. Verify the token using your secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_super_secret_key",
    );

    // 3. Attach the decoded user data (like username) to the request object
    req.user = decoded;

    // 4. Move on to the actual controller!
    next();
  } catch (e) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
