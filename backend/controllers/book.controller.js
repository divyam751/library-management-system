const { Book } = require("../models/book.model");
const { ApiResponse } = require("../utils/ApiResponse");

const getBooks = async (req, res) => {
  try {
    const { genre, author, publicationYear, search } = req.query;
    let query = {};

    if (genre) query.genre = { $regex: genre, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };
    if (publicationYear) query.publicationYear = Number(publicationYear);
    if (search) query.title = { $regex: search, $options: "i" };

    const books = await Book.find(query);
    return ApiResponse.success(res, books, 200, "Books fetched successfully");
  } catch (err) {
    console.error("Error in getBooks:", err);
    return ApiResponse.error(res, [err.message], 500, "Failed to fetch books");
  }
};

const addBook = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return ApiResponse.error(res, ["Unauthorized"], 403, "Access denied");
    }

    const { title, author, genre, publicationYear, description, coverImage } =
      req.body;

    if (!title || !author || !genre || !publicationYear) {
      return ApiResponse.error(res, [], 400, "All fields are required");
    }

    const newBook = new Book({
      title,
      author,
      genre,
      publicationYear,
      description,
      coverImage,
    });

    await newBook.save();
    return ApiResponse.success(res, newBook, 201, "Book added successfully");
  } catch (err) {
    console.error("Error in addBook:", err);
    return ApiResponse.error(res, [err.message], 500, "Failed to add book");
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return ApiResponse.error(res, [], 404, "Book not found");
    }

    return ApiResponse.success(
      res,
      updatedBook,
      200,
      "Book updated successfully"
    );
  } catch (err) {
    console.error("Error in updateBook:", err);
    return ApiResponse.error(res, [err.message], 500, "Failed to update book");
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return ApiResponse.error(res, [], 404, "Book not found");
    }

    return ApiResponse.success(res, null, 200, "Book deleted successfully");
  } catch (err) {
    console.error("Error in deleteBook:", err);
    return ApiResponse.error(res, [err.message], 500, "Failed to delete book");
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return ApiResponse.error(res, [], 404, "Book not found");
    }

    return ApiResponse.success(res, book, 200, "Book fetched successfully");
  } catch (err) {
    console.error("Error in getBookById:", err);
    return ApiResponse.error(res, [err.message], 500, "Failed to fetch book");
  }
};

module.exports = { getBooks, addBook, updateBook, deleteBook, getBookById };
