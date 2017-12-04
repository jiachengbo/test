'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  dbtools = require(path.resolve('./config/private/dbtools')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

var User = sequelize.model('User');
var Department = sequelize.model('Department');
var Role = sequelize.model('Role');
var WorkPosition = sequelize.model('WorkPosition');

/**
 * Create an workposition
 */
exports.create = function (req, res) {
  var role = req.body.JCDJ_User_roleID;
  role = JSON.parse(role);
  var branch = req.body.branch;
  branch = JSON.parse(branch);
  req.body.displayName = req.body.firstName + ' ' + req.body.lastName;
  //用户名称全部小写
  req.body.username = req.body.username.toLowerCase();
  req.body.JCDJ_User_roleID = role.UserRoleID;
  req.body.branchSimpleName = branch.simpleName;
  req.body.branch = branch.OrganizationId;
  req.body.user_grade = role.UserGradeID;
  var user = User.build(req.body);
  console.log(1111111111111);
  console.log(user);
  user.save()
    .then(function () {
      //保存workposition关联
      if (req.body.wps && Array.isArray(req.body.wps)) {
        //增加返回workpositions字段
        user.set('wps', req.body.wps, {raw: true});
        var workpositions = req.body.wps.map(function (workposition) {
          return WorkPosition.build(workposition);
        });
        return user.setWps(workpositions);
      }
    })
    .then(function() {
      res.json(user);
    })
    .catch(function (err) {
      logger.error('admin user create error:', err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var role = req.body.JCDJ_User_roleID;
  role = JSON.parse(role);
  var branch = req.body.branch;
  branch = JSON.parse(branch);
  req.body.displayName = req.body.firstName + ' ' + req.body.lastName;
  //用户名称全部小写
  req.body.username = req.body.username.toLowerCase();
  req.body.JCDJ_User_roleID = role.UserRoleID;
  req.body.branchSimpleName = branch.simpleName;
  req.body.branch = branch.OrganizationId;
  req.body.user_grade = role.UserGradeID;
  var id = req.body.id;
  var user = User.build(req.body);
  console.log(user);
/*
  // For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
*/
  // req.body.displayName = req.body.firstName + ' ' + req.body.lastName;
  // model.build 不会将非表字段加入实例，而instance.update会将所有参数加入实例
  // 如果使用了update(req.body),没有使用save,就不需要再调用user.set('wps', req.body.wps, {raw: true})设置新关联内容了
  User.update(
    req.body,
    {
      where: {'id': id}
    }
  )
    .then(function () {
      if (req.body.wps && Array.isArray(req.body.wps)) {
        var workpositions = req.body.wps.map(function (workposition) {
          return WorkPosition.build(workposition);
        });
        return user.setWps(workpositions);
      }
    })
    .then(function () {
      res.json(user);
    }).catch(function (err) {
      logger.error('admin user update error:', err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.destroy()
    .then(function () {
      //清除和workposition的关联
      return user.setWps([]);
    })
    .then(function () {
      res.json(user);
    }).catch(function (err) {
      logger.error('admin user delete error:', err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.findAll({
    attributes: {exclude: ['salt', 'password', 'providerData']},
    include: [
      {
        model: WorkPosition,
        as: 'wps',  //此处别名必须和定义中相同
        through: {
          as: 'wpu', //定义中间表别名
          attributes: []
        },
        attributes: ['id']
      }
    ],
    order: 'createdAt DESC'
  }).then(function (users) {
    res.json(users);
  }).catch(function (err) {
    logger.error('admin user list error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  User.findOne({
    where: {id: id},
    include: [
      {
        model: WorkPosition,
        as: 'wps',
        through: {
          as: 'wpu',
          attributes: []
        },
        attributes: ['id']
      }
    ],
    attributes: {exclude: ['salt', 'password', 'providerData']}
  }).then(function (user) {
    if (!user) {
      logger.error('admin user userbyid find null error id=', id);
      return next(new Error('Failed to load user ' + id));
    }
    req.model = user;
    next();
  }).catch(function (err) {
    logger.error('admin user userbyid error:', err);
    return next(err);
  });
};
