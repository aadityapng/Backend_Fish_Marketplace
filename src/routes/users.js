const express = require("express");
const UserController = require("../controller/users.js");
const router = express.Router();

// Create - POST
router.post("/", UserController.createNewProduct);

// READ - GET
router.get("/", UserController.getAllProducts);

// UPDATE - PATCH/PUT
router.patch("/:productId", UserController.updateProduct);

// DELETE - DELETE
router.delete("/:productId", UserController.deleteProduct);

module.exports = router;
