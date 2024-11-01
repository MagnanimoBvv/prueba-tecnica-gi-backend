const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('../routes/index');
const tasksRouter = require('../routes/tasks');

const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, {});

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('Conexion a MongoDB exitosa');
// });
// connection.on('error', (e) => {
//   console.log('Error en la base de datos', e);
// });

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
