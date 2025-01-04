const express = require("express");
const router = express.Router();
const validateDto = require("../middlewares/validate-dto.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware");
const CreateTodoDto = require("../controllers/todo/dto/create-todo.dto.js");
const SearchTodoDto = require("../controllers/todo/dto/search-todo.dto.js");
const UpdateTodoDto = require("../controllers/todo/dto/update-todo.dto.js");
const {create, getAll, getById, search, updateStatus, update, deleteTodo} = require("../controllers/todo/todo.controller.js");

router.post("/todo", authMiddleware, validateDto(CreateTodoDto), create);
router.get("/todo", authMiddleware, getAll);
router.get("/todo/search", authMiddleware, validateDto(SearchTodoDto, "query"), search);
router.get("/todo/:id", authMiddleware, getById);
router.put("/todo/:id", authMiddleware, validateDto(UpdateTodoDto), update);
router.patch("/todo/status/:id/completed", authMiddleware,updateStatus);
router.delete("/todo/:id", authMiddleware, deleteTodo);

module.exports = router;