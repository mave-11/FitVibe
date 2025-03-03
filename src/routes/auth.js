const express = require("express");
const router = express.Router();

// Import controllers
const authController = require("../controllers/auth");

// Register Route
router.post("/register", authController.register);

// Login Route
router.post("/login", authController.login);
//  logout route
router.post("/logout", authController.logout);
// Login Route
router.get("/login", authController.login);
router.get("/register", authController.register);

module.exports = router;
