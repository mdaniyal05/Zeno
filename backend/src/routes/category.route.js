const express = require("express");
const router = express.Router();
const {
  getcategory,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllCategories);
router.post("/create-category", protectRoute, createCategory);
router
  .route("/category/:id")
  .get(protectRoute, getcategory)
  .put(protectRoute, updateCategory)
  .delete(protectRoute, deleteCategory);

module.exports = router;
