const swig = require('swig');
const config = require('../../config/config');
const AWS = require('aws-sdk');
const _ = require('lodash');
const common = {};

// common.dataToCamelCase = (data) => {
//     let buffer = Array();
//     data.forEach(function(elem) {
//         let item = {};
//         elem.attributes.forEach(function(attr) {
//             item[ _.camelCase(attr) ] = elem[attr];
//         }, this);
//         buffer.push(item);
//     }, this);
//     return buffer;
// };

module.exports = common;