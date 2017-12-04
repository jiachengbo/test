'use strict';
// var path = require('path'),
//   dbExtend = require(path.resolve('./config/lib/dbextend'));
module.exports = function (sequelize, DataTypes) {

  var dj_PartyGeneralBranch = sequelize.define('dj_PartyGeneralBranch',
    {
      branchID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      branchName: {
        type: DataTypes.STRING,
        comment: '党总支名称'
      },
      simpleName: {
        type: DataTypes.STRING,
        comment: '党总支简称'
      },
      superior: {
        type: DataTypes.INTEGER,
        comment: '上级党组织'
      },
      generalbranch: {
        type: DataTypes.INTEGER,
        comment: '上级总支'
      },
      mold: {
        type: DataTypes.INTEGER,
        comment: '组织类型'
      },
      GradeID: {
        type: DataTypes.INTEGER,
        comment: '等级'
      }
    },
    {
      comment: '党工委、党委党总支信息表'
    }
  );
  // dbExtend.addBaseCode('dj_PartyGeneralBranch', {
  //   attributes: ['branchID', 'branchName', 'simpleName', 'superior', 'generalbranch', 'mold', 'GradeID']
  // });
  return dj_PartyGeneralBranch;
};
