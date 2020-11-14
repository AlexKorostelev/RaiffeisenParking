/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

mongoose.connect(process.env.DB_CONN, {
  autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true,
})
  .then(() => console.log('Mongoose connected!')).catch(() => console.log('DB connection Error!'));

const users = [{
  email: 'mr.burbu@mail.ru',
  password: '123',
},
{
  email: 'a@a.ru',
  password: '123',
},
{
  email: 'tomelektro@yandex.ru',
  password: '123',
}];

const usersSeed = async () => {
  // await mongoose.connection.dropDatabase();
  User.insertMany(users).then(() => {
    mongoose.connection.close();
    console.log('DB is seeded!');
  }).catch(() => {
    console.log('Duplicate!');
    mongoose.connection.close();
  });
};

module.exports = usersSeed;
