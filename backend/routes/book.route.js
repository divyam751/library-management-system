const express = require("express");
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookById,
} = require("../controllers/book.controller");
const { AuthMiddleware } = require("../middlewares/auth.middleware");

const bookRouter = express.Router();

bookRouter.get("/", getBooks);

bookRouter.get("/:id", getBookById);

bookRouter.post(
  "/",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(["admin"]),
  addBook
);
bookRouter.put(
  "/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(["admin"]),
  updateBook
);

bookRouter.delete(
  "/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(["admin"]),
  deleteBook
);

module.exports = { bookRouter };
