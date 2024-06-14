'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_users, { foreignKey: 'user_id' });
      this.hasOne(models.tbl_payments, { foreignKey: 'payment_id' });
      this.belongsTo(models.tbl_reservations, { foreignKey: 'reservation_id' });
    }
  }
  tbl_transactions.init({
    trans_id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tbl_users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    payment_id:{
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tbl_payments',
        key: 'payment_id'
      },
      onUpdate: 'CASCCADE',
      onDelete: 'CASCADE'
    },
    reservation_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tbl_reservations',
        key: 'reservation_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    trans_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbl_transactions',
    timestamps: true
  });
  return tbl_transactions;
};