const mongoose = require('mongoose');

const parkingSessionSchema = mongoose.Schema({
  carNumber: {
    type: String,
    required: true,
    unique: true,
  },
  startTime: Date,
  endTime: {
    type: Date,
    default: null,
  },
  parkingTitle: String,
  tariff: Number,
  paymentStatus: {
    type: String,
    default: false,
  }
});

module.exports = mongoose.model('ParkingSession', parkingSessionSchema);
