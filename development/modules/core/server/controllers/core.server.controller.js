'use strict';

var validator = require('validator'),
  path = require('path'),
  _ = require('lodash'),
  config = require(path.resolve('./config/config')),
  dbTools = require(path.resolve('./config/private/dbtools')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

function escape(str) {
  if (typeof(str) !== 'string') {
    return '';
  } else {
    return validator.escape(str);
  }
}
/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;

  if (req.user) {
    safeUserObject = {
      id: req.user.id,
      displayName: escape(req.user.displayName),
      provider: escape(req.user.provider),
      username: escape(req.user.username),
      createdAt: req.user.createdAt.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: escape(req.user.email),
      lastName: escape(req.user.lastName),
      firstName: escape(req.user.firstName),
      JCDJ_UserID: req.user.JCDJ_UserID,
      JCDJ_User_roleID: req.user.JCDJ_User_roleID,
      branch: req.user.branch,
      user_grade: req.user.user_grade,
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  //设置标题参数
  config.shared.title = config.app.title;
  config.shared.longTitle = config.app.longTitle;
  config.shared.copyRight = config.app.copyRight;

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {
  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
exports.jcdjuser = function (req, res) {
  // var sql = 'select * from dj_JCDJ_User s left join dj_PartyBranch p on s.branch = p.OrganizationId where JCDJ_UserID = ' + req.query.JCDJ_UserID;
  // sequelize.query(sql).spread(function(results, metadata) {
  //   // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
  //   return res.jsonp(results);
  // });
};
