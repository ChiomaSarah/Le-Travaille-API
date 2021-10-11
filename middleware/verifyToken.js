require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    const payload = jwt.verify(jwtToken, tokenSecret);
    if (!payload)
      return res
        .status(401)
        .json({ error: "Unauthorized access... Kindly login." });

    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(403).json({ error: "Unauthorized access... Kindly login!" });
  }
};
