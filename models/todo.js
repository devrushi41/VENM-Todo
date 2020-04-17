const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    content: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
