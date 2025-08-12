const express = require("express");
const router = express.Router();
const {
  getUsercategory,
  getAllUserCategories,
  createUserCategory,
  updateUserCategory,
  deleteUserCategory,
} = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getAllUserCategories);
router.post("/create-category", authMiddleware, createUserCategory);
router
  .route("/category/:id")
  .get(authMiddleware, getUsercategory)
  .put(authMiddleware, updateUserCategory)
  .delete(authMiddleware, deleteUserCategory);

module.exports = router;
