const express = require("express");
const router = express.Router();
const {
  getUsercategory,
  getAllUserCategories,
  createUserCategory,
  updateUserCategory,
  deleteUserCategory,
} = require("../controllers/category.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllUserCategories);
router.post("/create-category", protectRoute, createUserCategory);
router
  .route("/category/:id")
  .get(protectRoute, getUsercategory)
  .put(protectRoute, updateUserCategory)
  .delete(protectRoute, deleteUserCategory);

module.exports = router;
