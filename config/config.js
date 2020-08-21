const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {

  development: {
    secret: 'bigdonut',
    root: rootPath,
    app: {
      name: 'cdonut'
    },
    port: process.env.PORT || 3000,
    paypal: {
      url: 'https://www.sandbox.paypal.com/cgi-bin/webscr'
    },
    mongodb: {
      url: 'mongodb://127.0.0.1/cdonut',
      options: {
        db: { native_parser: true },
        server: { poolSize: 15 },
        //user: 'cadmin',
        //pass: 'cpass'
      }
    },
    aws: {
      ses: {
        accessKeyId: 'AKIAI4VF5VUO2KUBWZIQ',
        secretAccessKey: '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',
        region:'us-west-2'
      }
    }
  },

  test: {
    secret: 'bigdonut',
    root: rootPath,
    app: {
      name: 'cdonut'
    },
    port: process.env.PORT || 3000,
    paypal: {
      url: 'https://www.sandbox.paypal.com/cgi-bin/webscr'
    },
    mongodb: {
      url: 'mongodb://127.0.0.1/cdonut',
      options: {
        db: { native_parser: true },
        server: { poolSize: 15 },
        //user: 'cadmin',
        //pass: 'cpass'
      }
    },
    aws: {
      ses: {
        accessKeyId: 'AKIAI4VF5VUO2KUBWZIQ',
        secretAccessKey: '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',
        region:'us-west-2'
      }
    }
  },

  production: {
    secret: 'bigdonut',
    root: rootPath,
    app: {
      name: 'cdonut'
    },
    port: process.env.PORT || 3000,
    paypal: {
      url: 'https://www.sandbox.paypal.com/cgi-bin/webscr'
    },
    mongodb: {
      url: 'mongodb://127.0.0.1/cdonut',
      options: {
        db: { native_parser: true },
        server: { poolSize: 15 },
        //user: 'cadmin',
        //pass: 'cpass'
      }
    },
    aws: {
      ses: {
        accessKeyId: 'AKIAI4VF5VUO2KUBWZIQ',
        secretAccessKey: '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',
        region:'us-west-2'
      }
    }
  }

};

module.exports = config[env];
