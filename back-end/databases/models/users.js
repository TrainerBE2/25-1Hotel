'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.tbl_transactions, { foreignKey: 'user_id' })
      this.hasMany(models.tbl_reservations, { foreignKey: 'user_id' })
      this.hasMany(models.tbl_payments, { foreignKey: 'user_id' })
      this.hasMany(models.tbl_reviews, { foreignKey: 'user_id' })
    }
  }
  tbl_users.init({
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['root', 'admin', 'user'],
      defaultValue: 'user',
    },
    token: DataTypes.STRING,
    email_verified: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    archived: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'tbl_users',
    timestamps: true,
  });
  return tbl_users;
};