const express = require("express");
const {
  register,
  login,
  updateProfilePicture,
  payments,
} = require("../controllers/user");

// Middleware for authentication
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/create-checkout-session", payments);
router.post("/login", login);
router.put("/updateProfilePicture", authUser, updateProfilePicture);

module.exports = router;
