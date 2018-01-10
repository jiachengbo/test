'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  util = require('util'),
  config = require(path.resolve('./config/config')),
  child_process = require('child_process'),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an tests
 */
exports.create = function (req, res) {
  // var User = sequelize.model('User');
  var Tests = sequelize.model('Tests');
  var tests = Tests.build(req.body);

  // tests.user_id = req.user.id;
  tests.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return tests.reload(/*{
      include: [
        {
          model: User,
          attributes: ['displayName']
        }
      ]
    }*/)
    .then(function() {
      res.json(tests);
    });
  }).catch(function (err) {
    logger.error('tests create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current tests
 */
exports.read = function (req, res) {
  var tests = req.model ? req.model.toJSON() : {};

  //tests.isCurrentUserOwner = !!(req.user && tests.user && tests.user._id.toString() === req.user._id.toString());
  tests.isCurrentUserOwner = !!(req.user && tests.user && tests.user.id.toString() === req.user.id.toString());

  res.json(tests);
};

/**
 * Update an tests
 */
exports.update = function (req, res) {
  var tests = req.model;

  tests.title = req.body.title;
  tests.content = req.body.content;

  tests.save().then(function () {
    res.json(tests);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an tests
 */
exports.delete = function (req, res) {
  var tests = req.model;

  tests.destroy().then(function () {
    res.json(tests);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Tests
 */
exports.list = function (req, res) {
  var Tests = sequelize.model('Tests');
  // var User = sequelize.model('User');
// console.log( util);
  var cmdLine = util.format('copy %s %s',
    'D:\\贾兰\\*','D:\\c盘');
  console.log(cmdLine);
  child_process.exec(cmdLine, function (error, stdout, stderr) {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout);
  });
  Tests.findAll({
    /*include: [
      {
        model: User,
        attributes: ['displayName']
      }
    ],*/
    order: 'id ASC'
  }).then(function (tests) {
    return res.jsonp(tests);
  }).catch(function (err) {
    logger.error('tests list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * Tests middleware
 */
exports.testsByID = function (req, res, next, id) {
  var Tests = sequelize.model('Tests');
  // var User = sequelize.model('User');

  Tests.findOne({
    where: {id: id}/*,
    include: [
      {
        model: User,
        attributes: ['displayName']
      }
    ]*/
  }).then(function (tests) {
    if (!tests) {
      logger.error('No tests with that identifier has been found');
      return res.status(404).send({
        message: 'No tests with that identifier has been found'
      });
    }

    req.model = tests;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('tests ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
