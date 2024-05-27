'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_transactions, { foreignKey: 'payment_id' });
      this.belongsTo(models.tbl_users, { foreignKey: 'user_id' });
    }
  }
  tbl_payment.init({
    payment_id: {
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
    methode: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Paid', 'Pending', 'Failed'],
      defaultValue: 'Pending'
    }
  }, {
    sequelize,
    modelName: 'tbl_payments',
    timestamps: true
  });
  return tbl_payment;
};