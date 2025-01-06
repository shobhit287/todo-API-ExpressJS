const express = require("express");
const router = express.Router();
const LoginDto = require("../controllers/auth/dto/login.dto.js");
const validateDto = require("../middlewares/validate-dto.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {login, logout} = require("../controllers/auth/auth.controller.js");

router.post("/login", validateDto(LoginDto), login);
router.post("/logout", authMiddleware, logout);

module.exports = router;