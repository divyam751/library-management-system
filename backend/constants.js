require("dotenv").config();

const URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 8080;
const SECRET_KEY = process.env.SECRET_KEY;
const API_ENDPOINT = "api/v1";

module.exports = {
  URI,
  DB_NAME,
  PORT,
  SECRET_KEY,
  API_ENDPOINT,
};
