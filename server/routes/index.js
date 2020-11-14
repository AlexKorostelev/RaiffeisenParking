/* eslint-disable no-alert */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const mandrill = require('node-mandrill')('Iw1Uaes6lLD7gC9wn6WiAw');

/* Main page. */
router.get('/', (req, res) => {
  res.render('index');
});


/* function sendEmail(_name, _email, _subject, _message) {
  mandrill('/messages/send', {
    message: {
      to: [{ email: _email, name: _name }],
      from_email: 'noreply@yourdomain.com',
      subject: _subject,
      text: _message
    }
  }, function (error, response) {
    if (error) console.log(error);
    else console.log(response);
  });
}

router.post('/', function (req) {

  var _name = 'Имя'; // 'req.body.name';
  var _email = 'elsit-tm@yandex.ru'; // req.body.email;
  var _subject = req.body.subject;
  var _message = req.body.message;

  //implement your spam protection or checks. 

  sendEmail(_name, _email, _subject, _message);

});*/

/* Авторизация */
router.get('/login', async (req, res) => {
  res.redirect('/');
});

router.post('/login', async (req, res) => {
  const user = req.body;

  if (!(user.email && user.password)) {
    res.render('error', { message: 'Все поля должны быть заполнены!', layout: false });
    return;
  }

  const userdb = await User.findOne({ email: user.email });
  // console.log('POST /login', userdb.name, userdb.email, userdb.password);

  if (userdb) {
    if (userdb.password === user.password) {
      req.session.user = userdb;
      console.log('LOGIN, ПАРОЛЬ СОВПАЛ!!! ЗАЛОГИНИЛИСЬ КАК ===>', userdb.name);
      res.render('error', { message: 'ok', layout: false });
    } else {
      res.render('error', { message: 'Неверный логин / пароль!', layout: false });
    }
  } else {
    res.render('error', { message: 'Неверный логин / пароль!', layout: false }); // Юзер не найден
  }
});

/* Регистрация */
router.get('/registration', async (req, res) => {
  res.redirect('/');
});

router.post('/registration', async (req, res) => {
  const user = req.body; // Загружаем данные, переданные с фронта по fetch на POST-ручку
  if (!(user.name && user.email && user.password)) {
    res.render('error', { message: 'Все поля должны быть заполнены!', layout: false });
    return;
  }

  const userExist = await User.findOne({ email: user.email }); // Ищем в базе юзера с подобным email

  if (userExist) {
    res.render('error', { message: 'Пользователь с таким email уже зарегистрирован!', layout: false });
    return;
  }

  const newuser = new User(user);
  await newuser.save();
  req.session.user = user; // Заносим объект user в сессию
  res.render('index', { name: user.name });
  // console.log('REGISTRATION USER CREATED AND SAVED IN DB!', user);
});

/* Выход из профиля */
router.get('/logout', async (req, res) => {
  // console.log('ЗАШЛИ В LOGOUT!');
  req.session.destroy(); // удаляем сессию
  res.redirect('/');
});

module.exports = router;
