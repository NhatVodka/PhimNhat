const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const categoryRoute = require("./routes/category");
const genreRoute = require("./routes/genre");
const commentRoute = require("./routes/comment");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/category", categoryRoute);
app.use("/api/detail/genre", genreRoute);
app.use("/api/comments", commentRoute);

app.listen(8800, () => {
  console.log("Backend server is running");
});
