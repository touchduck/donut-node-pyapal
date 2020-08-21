const swig = require('swig');
const config = require('../../config/config');
const AWS = require('aws-sdk');
const _ = require('lodash');

AWS.config.update(config.aws.ses);
const ses = new AWS.SES();

const template = swig.compileFile(config.root +'/app/views/thankyou.swig');

const mailer = {};

mailer.sendMail = (dataMap) => {

    let vMail = dataMap.get('payer_email');
    vMail = _.replace(vMail, '%40', '@');
    var quantity = dataMap.get('quantity');
    var txn_id = dataMap.get('txn_id');

    let toAddresses = [ vMail ];
    let subject = 'Your Cdonut Order';
    let body = template({
        odrderId: txn_id,
        quantity: quantity
    });

    let params = {
            Destination: {
                ToAddresses: [ vMail ]
            },
            Message: {
                Body: {
                    Html: {
                        Data: body,
                        Charset: 'utf-8'
                    }
                },
                Subject: {
                    Data: subject,
                    Charset: 'utf-8'
                }
            },
            Source: 'no-reply@cdonut.com'
    };

    ses.sendEmail(params, function (err, data) {
        if(err){
            console.log(err);
        }else{
            console.log("email sent: " + JSON.stringify(data));
        }
    });

};

module.exports = mailer;