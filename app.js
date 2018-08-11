const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const radioRoutes = require('./api/routes/radios')
const tubeRoutes = require('./api/routes/tubes')
const userRoutes = require('./api/routes/users')

const app = express()

const config = process.env

// db connection

const connectionString = `mongodb+srv://${config.MONGO_ATLAS_LOGIN}:${
  config.MONGO_ATLAS_PASSWORD
  }@cluster0-zd998.mongodb.net/radio-jam?retryWrites=false`;

mongoose.connect(
  connectionString,
  { useNewUrlParser: true }
);

// CORS

app.use(cors());

// middlewares

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static("images"));

// routes

app.use('/radios', radioRoutes)
app.use('/tubes', tubeRoutes)
app.use('/users', userRoutes)

// error handling

app.use((req, res, next) => {
  const error = new Error("route not implemented");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
