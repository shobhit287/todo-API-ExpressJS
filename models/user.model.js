const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      immutable: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    const userId = this._id;
    await mongoose.model("Todo").deleteMany({ userId });
    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
