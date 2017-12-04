'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  usersCtrl = require(path.resolve('./modules/private/server/controllers/users-control.server.controller')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Module init function.
 */
module.exports = function (app, db) {
  // Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function (id, done) {
    var User = db.model('User');

    User.findOne(Object.assign({
      where: {id: id},
      attributes: {exclude: ['salt', 'password', 'providerData']}
    }, config.sessionLogging ? {} : {logging: false}))
      .then(function (user) {
        return user.setWpsRoles();
      })
      .then(function (user) {
        return done(null, user);
      })
      .catch(function (err) {
        logger.error('passport.deserializeUser error:', err);
        return done(err, null);
      });
  });

  // Initialize strategies
  //只是用local验证
  //config.utils.getGlobbedPaths(path.join(__dirname, './strategies/**/*.js')).forEach(function (strategy) {
  config.utils.getGlobbedPaths(path.join(__dirname, './strategies/local.js')).forEach(function (strategy) {
    require(path.resolve(strategy))(config);
  });

  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
      usersCtrl.userSessionCheck(req.user, req.sessionID)
        .then(function () {
          next();
        });
    } else {
      next();
    }
  });
};
