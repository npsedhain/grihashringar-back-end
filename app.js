const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

require("dotenv/config");

const app = express();

// load cors
app.use(cors());

//load body parser
app.use(bodyParser.json());

//Import routes
const loginRoute = require("./controller/login.route");
const adminRoute = require("./controller/admin.route");
const refreshRoute = require("./controller/refresh.route");
const inventoryRoute = require("./controller/inventory.route");

// Router level middleware
app.use("/api/admin", adminRoute);
app.use("/api/login", loginRoute);
app.use("/api/inventory", inventoryRoute);
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
  () => console.log("Connected to db")
);

app.listen(process.env.PORT);
