'use strict';
// var path = require('path'),
//   dbExtend = require(path.resolve('./config/lib/dbextend'));
module.exports = function (sequelize, DataTypes) {

  var street_info = sequelize.define('street_info',
    {
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      streetName: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_FZR: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_JBDZ: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_MJ: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_RK: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_YB: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_tel: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_JJLXR: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_JJLXR_tel: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_IP: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_port: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_WWJJLXR: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_WWJJLXR_tel: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_XFJJLXR: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_XFJJLXR_tel: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_ZZJJLXR: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_ZZJJLXR_tel: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_FXJJLXR: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      street_FXJJLXR_tel: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      createUserId: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      createDate: {
        type: DataTypes.DATE,
        comment: ''
      },
      modifyUserId: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      modifyDate: {
        type: DataTypes.DATE,
        comment: ''
      }
    },
    {
      comment: 'street_info table'//,
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
  // dbExtend.addBaseCode('street_info', {attributes: ['streetID', 'streetName']});
  return street_info;
};
