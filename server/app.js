const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoute = require("./routes/auth");
const noteRoute = require("./routes/category");
const subCategoryRoute = require("./routes/subCategory");
const messageRoute = require("./routes/message");

app.use("/auth", authRoute);
app.use("/note", noteRoute);
app.use("/message", messageRoute);
app.use(subCategoryRoute);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error.";
  console.log(error);
  res.status(statusCode).json({ success: false, message: message });
});

const PORT = 1200;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started at port no: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
