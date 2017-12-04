'use strict';
// var path = require('path'),
//   dbExtend = require(path.resolve('./config/lib/dbextend'));
module.exports = function (sequelize, DataTypes) {

  var dj_PartyOrganization = sequelize.define('dj_PartyOrganization',
    {
      typeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      typeName: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '党工委、党委名称'
      },
      simpleName: {
        type: DataTypes.STRING,
        comment: '简称'
      },
      comType: {
        type: DataTypes.INTEGER,
        comment: '模块类型（党委、党工委）'
      },
      roleID: {
        type: DataTypes.INTEGER,
        comment: '角色ID'
      }
    },
    {
      comment: 'dj_PartyOrganization table'//,
      // indexes: [
      //   {
      //     //在外键上建立索引
      //     fields: ['user_id']
      //   }
      // ],
      // classMethods: {
      //   associate: function (models) {
      //     this.belongsTo(models.User,
      //       {foreignKey: 'user_id'});
      //   }
      // }
    }
  );
  // dbExtend.addBaseCode('dj_PartyOrganization', {attributes: ['typeID', 'typeName', 'comType', 'roleID']});
  return dj_PartyOrganization;
};
