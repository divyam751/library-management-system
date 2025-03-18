const express = require("express");
const { PORT } = require("./constants");
const { connectDB } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const { bookRouter } = require("./routes/book.route");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "https://dc-lms.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to the world of LMS backend!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`\n ⚙️  Server is running on port: http://localhost:${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
});
