const express = require("express");
const UserController = require("../controller/users.js");
const router = express.Router();
const path = require("path");

router.use("/images", express.static(path.join(__dirname, "images")));

router.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;

  // Construct the file path based on the requested image name
  const imagePath = path.join(__dirname, "../../pub/images", imageName);

  // Check if the file exists
  if (require("fs").existsSync(imagePath)) {
    // If the file exists, send it as a response
    res.sendFile(imagePath);
  } else {
    // If the file doesn't exist, return a 404 error
    res.status(404).send("Image not found");
  }
});

// Create - POST
router.post("/", UserController.createNewProduct);

// READ - GET
router.get("/", UserController.getAllProducts);

// UPDATE - PATCH/PUT
router.patch("/:productId", UserController.updateProduct);

// DELETE - DELETE
router.delete("/:productId", UserController.deleteProduct);

module.exports = router;
