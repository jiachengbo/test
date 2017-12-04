'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  path = require('path'),
  sequelize = require(path.resolve('./config/lib/sequelize'));

module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy(
    {
      usernameField: 'usernameOrEmail',
      passwordField: 'password'
    },
    function (usernameOrEmail, password, done) {
      var User = sequelize.model('User');
      User.findOne({
        where: {
          $or: [
            {username: usernameOrEmail.toLowerCase()},
            {email: usernameOrEmail.toLowerCase()}
          ]
        }
      }).then(function (user) {
        if (!user || !user.authenticate(password)) {
          return done(null, false, {
            message: 'Invalid username or password (' + (new Date()).toLocaleTimeString() + ')'
          });
        } else {
          //设置用户权限信息
          return user.setWpsRoles()
            .then(function () {
              return done(null, user);
            });
        }
      }).catch(function (err) {
        return done(err);
      });
    }));
};
