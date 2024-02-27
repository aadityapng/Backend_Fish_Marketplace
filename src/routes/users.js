const express = require("express");
const UserController = require("../controller/users.js");
const router = express.Router();

// Create - POST
router.post("/", UserController.createNewUsers);

// READ - GET
router.get("/", UserController.getAllUsers);

// UPDATE - PATCH/PUT
router.patch("/:idUser", UserController.updateUser);

// DELETE - DELETE
router.delete("/:idUser", UserController.deleteUser);

module.exports = router;
