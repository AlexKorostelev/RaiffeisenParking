const express = require('express');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const router = express.Router();
const User = require('../models/user');

router
  .post('/new', async (req, res) => {
    const { carNumber, password } = req.body;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, async (error, hash) => {
        const user = new User({ carNumber, password: hash });
        await user.save().then(() => {
          res.sendStatus(200);
        }).catch(() => res.sendStatus(401));
      });
    });
  })
  .post('/login', async (req, res) => {
    const { carNumber, password } = req.body;
    const user = await User.findOne({ carNumber });
    if (user) {
      const hash = user.password;
      const isValidPass = await bcrypt.compare(password, hash);
      if (isValidPass) {
        return res.sendStatus(200);
      }
      return res.sendStatus(401);
    }
    return res.sendStatus(401);
  });

module.exports = router;
