const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const radioRoutes = require("./api/routes/radios");
const tubeRoutes = require("./api/routes/tubes");

const app = express();

const config = process.env;

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db connection

const connectionString = `mongodb+srv://${config.MONGO_ATLAS_LOGIN}:${
  config.MONGO_ATLAS_PASSWORD
}@cluster0-zd998.mongodb.net/radio-jam?retryWrites=false`;

mongoose.connect(
  connectionString,
  { useNewUrlParser: true }
);

// middlewares

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static("images"));

// CORS

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    // It doesn't need to continue to the routes
    // if the method was OPTIONS
    return res.status(200).json({});
  }
  next();
});

// routes

app.use("/radios", radioRoutes);
app.use("/tubes", tubeRoutes);

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
