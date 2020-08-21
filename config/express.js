const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');

const swig = require('swig');
const session = require('express-session');

const i18n = require('i18n');

const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = (app, config) => {
  let env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  app.locals.ENV_PRODUCTION = env == 'production';

  app.engine('swig', swig.renderFile);
  if(env == 'development'){
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
  }
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'swig');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  // session
  let connection = mongoose.createConnection(config.mongodb.url, config.mongodb.options);
  app.use(session({
    secret: 'ilovedonut',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: connection })
  }));

  // i18nの設定
  i18n.configure({
    locales: ['en', 'ja', 'ko'],
    directory: config.root + '/locales',
    objectNotation: true
  });
  app.use(i18n.init);

  // set locale (on every request), if session locale exists
  // otherwise use default browser setting
  app.use( (req, res, next) => {
      // check if user has changed i18n settings
      if (req.session.locale) {
          i18n.setLocale(req, req.session.locale);
      }
      next();
  });

  // auth token
  require(config.root + '/config/token.js')(app);

  let controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach( (controller) => {
    require(controller)(app);
  });

  app.use( (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use( (err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use( (err, req, res, next) => {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

  return app;
};
