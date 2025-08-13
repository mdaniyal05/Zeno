const jwt = require("jsonwebtoken");

const generateJwtToken = (payload, secret, expiry) => {
  const token = jwt.sign({ payload }, secret, {
    expiresIn: expiry,
  });

  return token;
};

module.exports = generateJwtToken;
