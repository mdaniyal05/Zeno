const getUserProfile = (req, res) => {
  res.status(200).json({
    message: "User profile.",
  });
};

const updateUserProfile = (req, res) => {
  res.status(201).json({
    message: "User profile updated Successfully.",
  });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
