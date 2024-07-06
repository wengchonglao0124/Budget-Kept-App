var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs");
// Please add .env and change port to 3001 for this server
require("dotenv").config();

const db = require("./db");
const knex = require("knex")(db);

const helmet = require('helmet');
const cors = require('cors');

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// Save a record of the log in the access.txt for later analysis
const logStream = fs.createWriteStream(path.join(__dirname, "access.txt"), {
  flags: "a",
});
app.use(logger("common", { stream: logStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make the database connection available to the application
app.use((req, res, next) => {
  req.db = knex;
  next();
});

app.use(helmet());
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Test database connection and version
app.use("/version", (req, res) => {
  // Determine the database version
  req.db.raw("SELECT VERSION()")
      .then(versionResponse => {
        const version = versionResponse[0][0];

        // Fetch the table names
        req.db.raw("SELECT table_name FROM information_schema.tables WHERE table_schema = 'budgetKeeper'")
            .then(tablesResponse => {
              res.send({
                version: version,
                tables: tablesResponse[0]
              });
            }).catch(err => {
          console.error('Error fetching table names:', err);
          res.status(500).send('Failed to retrieve table names');
        });
      })
      .catch(err => {
        console.error('Error fetching database version:', err);
        res.status(500).send('Failed to retrieve database version');
      });
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
