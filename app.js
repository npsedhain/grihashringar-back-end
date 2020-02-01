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
const itemRoute = require("./routes/item.route");
const buyerRoute = require("./routes/buyer.route");
const loginRoute = require("./routes/login.route");
const adminRoute = require("./routes/admin.route");
const refreshRoute = require("./routes/refresh.route");
const categoryRoute = require("./routes/category.route");
const transactionRoute = require("./routes/transaction.route");

// Router level middleware
app.use("/api/item", itemRoute);
app.use("/api/buyer", buyerRoute);
app.use("/api/admin", adminRoute);
app.use("/api/login", loginRoute);
app.use("/api/category", categoryRoute);
app.use("/api/token/refresh", refreshRoute);
app.use("/api/transaction", transactionRoute);

//ROUTES
app.get("/", (req, res) => {
  res.send("We are in home");
});

//Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
