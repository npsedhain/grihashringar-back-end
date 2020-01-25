const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv/config");

// load cors
app.use(cors());

//load body parser
app.use(bodyParser.json());

//Import routes
const loginRoute = require("./controller/login.route");
const adminRoute = require("./controller/admin.route");
const refreshRoute = require("./controller/refresh.route");
const categoryRoute = require("./controller/category.route");
const itemRoute = require("./controller/item.route");

// Router level middleware
app.use("/api/admin", adminRoute);
app.use("/api/login", loginRoute);
app.use("/api/category", categoryRoute);
app.use("/api/inventory", itemRoute);
app.use("/api/token/refresh", refreshRoute);

//ROUTES
app.get("/", (req, res) => {
  res.send("We are in home");
});

//Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true
  },
  (err, db) => {
    if (err) {
      res
        .status(500)
        .json({ err, message: " Error connecting to the database. " });
      return;
    }
    console.log("Connected to db at port,", process.env.PORT);
  }
);

app.listen(process.env.PORT);
