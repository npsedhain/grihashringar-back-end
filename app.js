const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express(); 

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

app.listen(3000);