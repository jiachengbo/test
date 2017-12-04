'use strict';

module.exports = function (sequelize, DataTypes) {

  var Tests = sequelize.define('Tests',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: 'title'
      },
      content: {
        type: DataTypes.STRING,
        comment: 'content'
      }
    },
    {
      comment: 'tests table'
     /* indexes: [
        {
          //在外键上建立索引
          fields: ['user_id']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.User,
            {foreignKey: 'user_id'});
        }
      }*/
    }
  );

  return Tests;
};
