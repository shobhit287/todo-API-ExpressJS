const mongoose = require("mongoose");
const Todo = require("../models/todo.model");
const CustomErrorHandler = require("../customErrorHandler");

class TodoService {
  async create(todoDetails) {
    try {
      const todo = new Todo(todoDetails);
      todo.save();
      return todo;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new CustomErrorHandler(400, {
          error: error.message.error || error.message,
        });
      }
    }
  }

  async findAll() {
    try {
      return await Todo.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(data) {
    try {
      return await Todo.findOne(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async search(query) {
    try {
      return await Todo.find(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOne(id, updatedTodoDetails) {
    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id },
        updatedTodoDetails,
        { new: true }
      );
      if (!updatedTodo) {
        throw new CustomErrorHandler(404, { error: "Todo not found" });
      }
      return updatedTodo;
    } catch (error) {
      if (error instanceof CustomErrorHandler) {
        throw error;
      } else {
        throw new Error(error);
      }
    }
  }

  async delete(id) {
    try {
      const result = await Todo.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new CustomErrorHandler(404, { error: "Todo not found" });
      }
    } catch (error) {
      if (error instanceof CustomErrorHandler) {
        throw error;
      } else {
        throw new Error(error);
      }
    }
  }
}
module.exports = TodoService;
