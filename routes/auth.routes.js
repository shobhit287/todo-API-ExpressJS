const express = require("express");
const router = express.Router();
const LoginDto = require("../controllers/auth/dto/login.dto.js");
const validateDto = require("../middlewares/validate-dto.middleware.js");
const {login} = require("../controllers/auth/auth.controller.js");

router.post("/login", validateDto(LoginDto), login);

module.exports = router;