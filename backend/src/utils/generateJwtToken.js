const jwt = require("jsonwebtoken");

const generateJwtToken = (payload, secret, expiry) => {
  const jwtToken = jwt.sign({ payload }, secret, {
    expiresIn: expiry,
  });

  // res.cookie("jwtToken", jwtToken, {
  //   httpOnly: true,
  //   maxAge: 3600000,
  //   sameSite: "strict",
  //   secure: process.env.NODE_ENV !== "development",
  // });
};

module.exports = generateJwtToken;
