const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { create, getAll, getById, update, deleteUser, changePassword, decodeToken } = require("../controllers/user/user.controller");
const validateDto = require("../middlewares/validate-dto.middleware");
const CreateUserDto = require("../controllers/user/dto/create-user.dto");
const ChangePasswordDto = require("../controllers/user/dto/change-password.dto");
const UpdateUserDto = require("../controllers/user/dto/update-user.dto");

router.post("/user", validateDto(CreateUserDto), create);
router.get("/user", authMiddleware, getAll);
router.get("/user/decode-token", decodeToken);
router.get("/user/:id", authMiddleware, getById);
router.put("/user/:id", authMiddleware, validateDto(UpdateUserDto), update);
router.patch("/user/:id/change-password", authMiddleware, validateDto(ChangePasswordDto), changePassword);
router.delete("/user/:id", authMiddleware, deleteUser);

module.exports = router;
