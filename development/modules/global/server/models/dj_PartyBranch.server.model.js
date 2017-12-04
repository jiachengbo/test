'use strict';
// var path = require('path'),
//   dbExtend = require(path.resolve('./config/lib/dbextend'));
module.exports = function (sequelize, DataTypes) {

  var dj_PartyBranch = sequelize.define('dj_PartyBranch',
    {
      OrganizationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      OrganizationName: {
        type: DataTypes.STRING,
        comment: '党组织名称'
      },
      simpleName: {
        type: DataTypes.STRING,
        comment: '党支部简称'
      },
      generalbranch: {
        type: DataTypes.INTEGER,
        comment: '上级总支'
      },
      super: {
        type: DataTypes.INTEGER,
        comment: '上级党组织'
      },
      mold: {
        type: DataTypes.INTEGER,
        comment: '组织类别'
      }
    },
    {
      comment: '党工委、党委党支部信息表'
    }
  );
  // dbExtend.addBaseCode('dj_PartyBranch', {
  //   attributes: ['OrganizationId', 'OrganizationName', 'simpleName', 'simpleName', 'generalbranch', 'super', 'mold']
  // });
  return dj_PartyBranch;
};
