const mongoose = require("mongoose");
const { TODO_STATUS } = require("../enum.constants");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        status: {
            type: String,
            enum: TODO_STATUS,
            default: "PENDING",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model("Todo", todoSchema); 
module.exports = Todo;
