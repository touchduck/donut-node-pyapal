const express = require('express');
const i18n = require('i18n');
const router = express.Router();
const mongoose = require('mongoose');
const Memo = mongoose.model('Memo');

const request = require('request');
const querystring = require('querystring');
const config = require('../../config/config');
const _ = require('lodash');
const mailer = require('../helper/mailer');


module.exports = (app) => {
  app.use('/memo', router);
};

router.get('/', (req, res, next) => {

    let memo = new Memo();
    memo.text = "this is my memo";
    memo.save();

    var data = { isComplete: true };
    res.send(data);
});

router.post('/create', (req, res, next) => {
    var data = { isComplete: true };
    res.send(data);
});
