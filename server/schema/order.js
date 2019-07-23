/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    delete_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    snap_img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    snap_name: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    total_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    snap_items: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    snap_address: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    prepay_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'order'
  });
};
