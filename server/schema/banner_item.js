/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('banner_item', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    img_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    key_word: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    delete_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    banner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'banner_item'
  });
};
