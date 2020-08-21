const express = require('express');
const i18n = require('i18n');
const router = express.Router();
const mongoose = require('mongoose');
const Payment = mongoose.model('Payment');

const request = require('request');
const querystring = require('querystring');
const config = require('../../config/config');
const _ = require('lodash');
const mailer = require('../helper/mailer');

// https://www.paypal.jp/uploadedFiles/wwwpaypaljp/Supporting_Content/jp/manual/PP_JP_NVPAPI_DeveloperGuide_JP.pdf
// デベロッパー向けPayPalおよびIPNの概要
// https://www.paypal.com/jp/cgi-bin/webscr?PPREDIRECT=y3RIPja85oqqGlQZ78bA-huo_h5E_TyRlq53iIIGGQm-PoOazBUk5S2scBW43q0AB4vXNpfHfGTkVr1RggBV055Gn0lB2covAGskSG&dispatch=5885d80a13c0db1f8e263663d3faee8d333dc9aadeed3fe0b5b299d55fd35542
// 即時支払い通知(IPN)
// https://www.paypal.com/jp/cgi-bin/webscr?cmd=p/acc/ipn-info-outside

module.exports = (app) => {
  app.use('/payment', router);
};

router.get('/success', (req, res, next) => {

  res.render('payment_success', {});

});

function savePayment(dataMap) {

  let newPayment = {};
  for (let item of dataMap) {
    //console.log(item[0] + '=' + item[1]);
    newPayment[item[0]] = item[1];
  }

  newPayment.original_data = JSON.stringify(newPayment);
  let payment = new Payment(newPayment);

  payment.save();

}

router.post('/ipn', (req, res, next) => {

  req.body = req.body || {};

  //console.log('Received event:', JSON.stringify(req.body, null, 2));

  res.status(200).send('OK');
  res.end();

  //Read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
  let body = 'cmd=_notify-validate';
  let dataMap = new Map();

  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      let value = req.body[key];
      body = body + "&" + key + "=" + value;
      dataMap.set(key, value);
      //console.log(key + '=' + value)
    }
  }

  //console.log('Verifying');
  //console.log(body);

  const options = {
    url: config.paypal.url,
    method: 'POST',
    headers: {
      'Connection': 'close'
    },
    body: body,
    strictSSL: true,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
  };

  //POST IPN data back to PayPal to validate
  request(options, (error, response, body) => {

    if (!error && response.statusCode === 200) {

      savePayment(dataMap);

      if (body.substring(0, 8) === 'VERIFIED') {
        console.log('Verified IPN!');

        let payment_status = dataMap.get('payment_status');
        let txn_type = dataMap.get('txn_type');
        console.log('payment_status = ' + payment_status);
        console.log('txn_type = ' + txn_type);

        if (payment_status == 'Completed') {
            mailer.sendMail(dataMap);

        } else if (payment_status == 'Refunded') {
          //mailer.sendMail(dataMap);

        } else {
          // not thing..
        }

      } else if (body.substring(0, 7) === 'INVALID') {
        console.log('Invalid IPN!');

      } else {
        console.log('Unexpected response body!');
        console.log(body);
      }
    } else {
      console.log('Unexpected response!');
      console.log(response);
    }

  });

});
