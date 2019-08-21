/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    headimgurl: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    extend: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
