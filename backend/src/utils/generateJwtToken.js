const jwt = require("jsonwebtoken");

const generateJwtToken = (res, userId) => {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwtToken", jwtToken, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateJwtToken;
