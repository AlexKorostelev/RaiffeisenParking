const express = require('express');

const router = express.Router();
const ParkingSession = require('../models/parkingsession');

/* GET rendering with info of user */
router
  .get('/:carNumber/info', async (req, res) => {
    const session = await ParkingSession.findOne({ carNumber: req.params.carNumber });
    console.log('getSESSION', session);
    if (session) return res.status(200).json(session);
    return res.sendStatus(418);
  })
  .post('/new', async (req, res) => {
    const { carNumber } = req.body;
    const parkingTitle = 'testParking';
    const testTariff = 100;
    const newSession = new ParkingSession({
      carNumber,
      startTime: Date.now(),
      parkingTitle,
      tariff: testTariff,
    });
    await newSession.save();
    console.log('POST REQUEST newSession', newSession);
    res.end();
  })
  .post('/:id/stop', async (req, res) => {
    const stoppedSession = await ParkingSession.findOne({ _id: req.params.id });
    stoppedSession.endTime = Date.now();
    await stoppedSession.save();
    return res.status(200).json(stoppedSession);
  });

module.exports = router;
