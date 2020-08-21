const express = require('express');
const i18n = require('i18n');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  User.find( (err, users) => {
    if (err) return next(err);
    res.render('home', {
    });
  });
});

router.get('/i18n/:locale', (req, res, next) => {
  req.session.locale = req.params.locale;
  res.redirect('back');
});

router.get('/health', (req, res, next) => {
  res.status(200).send('OK');
	res.end();
});