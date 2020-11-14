/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('../models/parkingsession');
require('dotenv').config();

mongoose.connect(process.env.DB_CONN, {
  autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true,
})
  .then(() => console.log('Mongoose connected!')).catch(() => console.log('DB connection Error!'));

const parkingsessions = [{
  carNumber: 'o491oc70',
  startTime: Date.now(),
}];

const parkingsessionSeed = async () => {
  // await mongoose.connection.dropDatabase();
  User.insertMany(parkingsessions).then(() => {
    mongoose.connection.close();
    console.log('DB is seeded!');
  }).catch(() => {
    console.log('Duplicate!');
    mongoose.connection.close();
  });
};

module.exports = parkingsessionSeed;
