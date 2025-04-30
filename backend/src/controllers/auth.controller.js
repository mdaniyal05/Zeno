const registerUser = async (req, res) => {
  res.status(201).json({
    message: "User registered Successfully.",
  });
};

const loginUser = async (req, res) => {
  res.status(200).json({
    message: "User logged in Successfully.",
  });
};

const logoutUser = async (req, res) => {
  res.status(200).json({
    message: "User logged out Successfully.",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
