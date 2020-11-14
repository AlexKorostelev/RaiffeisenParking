/* eslint-disable no-console */
const express = require('express');
// const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser'); // to save cookie from client into req.cookies
const mongoose = require('mongoose');
const session = require('express-session'); // to control sessions
const MongoStore = require('connect-mongo')(session); // to store in MongoDB
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const sessionRouter = require('./routes/session');

// const usersSeed = require('./seeder/users');
// const parkingsessionSeed = require('./seeder/parkingsessions');

// console.log(Date.now());

// mongoose connection
mongoose.connect(process.env.DB_CONN, {
  useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false,
})
  .then(() => console.log('Mongoose connected!')).catch(() => console.log('Error!'));
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // so we can send data from post requests
app.use(cookieParser()); // it saves cookies from browser everytime into req.cookies
app.use(express.static(path.join(__dirname, 'public'))); // Public folder
app.use(cors());
// seed();
// console.log(process.env.DB_CONN);

// DB Seeders ===========================================
// usersSeed();
// parkingsessionSeed();
// Seeders ===========================================

// middleware for session - saving cookies
app.use(session({
  store: new MongoStore({ // storing in mongodb via mongostore
    mongooseConnection: mongoose.createConnection(process.env.DB_CONN,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }),
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 999999999999999, httpOnly: false },
}));

// middleware to create res locals so we can get user info on any route
app.use(async (req, res, next) => {
  res.locals.user = req.session?.user;
  // console.log(res.locals.user, 'RES LOCALS MIDDLEWARE USER');
  next();
});

// checking if user logged in (if username in req.session)
/* function CheckUser(req, res, next) {
  const sessionUser = req.session?.user;
  if (!sessionUser) {
    return res.redirect('/');
  }
  next();
} */

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/session', /* CheckUser, */ sessionRouter);
// catch 404
app.use((req, res, next) => {
  next();
});

// log of error
/* app.use((err) => {
  console.error('err', err);
}); */

app.listen(process.env.PORT, () => console.log(`Server is on ${process.env.PORT}`));
