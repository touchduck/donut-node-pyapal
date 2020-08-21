const express = require('express');
const i18n = require('i18n');
const router = express.Router();
const mongoose = require('mongoose');
const Payment = mongoose.model('Payment');

const querystring = require('querystring');

const co = require('co');
const mailer = require('../helper/mailer');

const moment = require('moment-timezone');
require("moment-range");

moment().tz("America/Los_Angeles").format();

module.exports = (app) => {
  app.use('/test', router);
};

router.get('/', (req, res, next) => {

  Payment.find( (err, payments) => {
    if (err) return next(err);

    for (pay in payments) {
      let sss = pay;
    }

    res.render('test', {});
  });

});

router.get('/time', (req, res, next) => {

  var current_date = new Date();

  var timezone = "Asia/Tokyo";

  var current_date_jst = moment(current_date).tz(timezone).format();
  var oldtime = moment(current_date_jst).add('months', 1).tz(timezone);
  let timeRange = moment.range(oldtime, moment(new Date()).tz(timezone));

  let secs = timeRange.diff('seconds');
  let minutes = timeRange.diff('minutes');
  let days = timeRange.diff('days');

  if (secs < 0) {

  }

  console.log(console.format());

  res.render('test', {});
});

router.get('/mail', (req, res, next) => {

    mailer.sendMail();

    res.render('test', {});
});

const timer = (str, ms) => {
  return new Promise((resolve) => {
    console.log(str);
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

router.get('/co', (req, res, next) => {

  co(function*() {
    yield timer('1', 1000);
    yield timer('2', 1000);
    yield [timer('3', 1000), timer('4', 1000), timer('5', 1000)];
    yield timer('6', 1000);
    res.render('test', {});
  });

});
