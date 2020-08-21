const express = require('express');
const i18n = require('i18n');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.use('/api', router);
};

const generateToken = (user) => {
    let data = { email:'admin@gmail.com' }
    return jwt.sign(data, config.secret, {
        expiresIn: 10080 // seconds
    });
}

router.post('/authenticate', (req, res, next) => {
    let token = generateToken({});
    res.status(201).json({
        token: token
    });
});

router.use( (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'no token provided.'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                message: 'invalid token'
            });
        }
        req.decoded = decoded;
        next();
    });

});
