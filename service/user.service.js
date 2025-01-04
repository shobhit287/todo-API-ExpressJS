const mongoose = require("mongoose");
const User = require("../models/user.model");
const CustomErrorHandler = require("../customErrorHandler");

class UserService {
  async create(userDetails) {
    try {
      const user = new User(userDetails);
      await user.save();
      return user;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new CustomErrorHandler(400, {
          error: error.message.error || error.message,
        });
      } else if (error.code === 11000) {
        throw new CustomErrorHandler(409, { error: "Email already exists" });
      }
    }
  }

  async findOne(data) {
    try {
      return await User.findOne(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOne(id, updatedUserDetails) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        updatedUserDetails,
        { new: true }
      );
      if (!updatedUser) {
        throw new CustomErrorHandler(404, { error: "User not found" });
      }
      return updatedUser;
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
      const result = await User.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new CustomErrorHandler(404, { error: "User not found" });
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
module.exports = UserService;
