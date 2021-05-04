import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // extract the jwt token from the request header Authorization: Bearer <Token>
    if (!req.headers.authorization) {
      return res
        .status(404)
        .json({ error: "No authorization header provided" });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      try {
        const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData.id;
      } catch (error) {
        return res.status(404).json({ error: "Unauthenticated" });
      }
    } else {
      return res.status(404).json({ error: "Token not found" });
    }

    // now have access to userId as part of the request
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export default auth;
