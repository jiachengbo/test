'use strict';
// var path = require('path'),
//   dbExtend = require(path.resolve('./config/lib/dbextend'));
module.exports = function (sequelize, DataTypes) {

  var grid = sequelize.define('grid',
    {
      gridnumid: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      gridId: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      departmentId: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      dutyUser: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      boundary: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      context: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      createUser: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      modifyUser: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      modifyDate: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      gridNum: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: ''
      },
      streetID: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      is_syn: {
        type: DataTypes.INTEGER,
        comment: ''
      }
    },
    {
      comment: 'grid table'//,
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
  // dbExtend.addBaseCode('grid', {attributes: ['gridnumid', 'gridName', 'gridId', 'departmentId', 'gridNum', 'streetID']});
  return grid;
};
