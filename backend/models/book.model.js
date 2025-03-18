const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: [String],
      required: [true, "Genre is required"],
      trim: true,
    },
    publicationYear: {
      type: Number,
      required: [true, "Publication Year is required"],
      min: [1000, "Invalid year"],
      max: [new Date().getFullYear(), "Invalid year"],
    },
    description: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      default: "https://i.imgur.com/NAZWTGP.png",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
