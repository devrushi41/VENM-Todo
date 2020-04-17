const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();
const PORT = process.env.PORT || 3000;

// db connection
mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todo", todoRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
