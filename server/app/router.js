const express = require("express");

const categoryController = require("./controllers/categoryController");
const postController = require("./controllers/postController");

const router = express.Router();

router.get("/categories", categoryController.findAll);
router.get("/posts", postController.findAll);
router.get("/posts/:id", postController.findById);
router.get("/posts/category/:id", postController.findByCategory);
router.post("/posts", postController.addPost);
router.post("/categories", categoryController.addCategory);

module.exports = router;