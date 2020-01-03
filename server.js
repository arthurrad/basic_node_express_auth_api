const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


const app = express();

//Import Routes
const authRoute = require('./routes/auth');


//const API_PORT = config.port || 3000;
const API_PORT = process.env.API_PORT || 3000;

//Confirm Connection to DB
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('An error occurred establishing database connection')
  } else {
    console.log('Connected to database successfully')
  }
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Route Middlewares
app.use('/api/user', authRoute);



app.listen(API_PORT, () => console.log(`Auth Server Listening on port ${API_PORT}`));
