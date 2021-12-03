import { HttpError } from "http-errors";

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import { uploader, cloudinaryConfig } from './utils/cloudinary'
require('dotenv').config()
// import indexRouter from './routes/index';
import usersRouter from './routes/users';
// import { pool } from "./database/database";

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(
  err:HttpError, 
  req:express.Request, 
  res:express.Response, 
  next:express.NextFunction
  ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

// pool.connect().then(() => console.log(`connected to DB`)).catch(err => console.log(err))

export default app;
