/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('theme_product', {
    theme_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'theme_product'
  });
};
