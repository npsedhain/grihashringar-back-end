const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express(); 
require('dotenv/config');

//load body parser
app.use(bodyParser.json());

//Import routes
const inventoryRoute = require('./controller/inventory.route');

app.use('/inventory', inventoryRoute);

//ROUTES
app.get('/', (req, res) => {
  res.send('We are in home');
});

app.get('/posts', (req, res) => {
  res.send({posts: "This is a post"});
});

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
  }, () => console.log('Connected to db'));

app.listen(process.env.PORT);
