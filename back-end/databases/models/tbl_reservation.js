'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_users, {foreignKey: 'user_id'})
      this.hasMany(models.tbl_reviews, {foreignKey: 'review_id'})
      this.belongsTo(models.tbl_transactions, {foreignKey: 'reservation_id'})
      this.belongsTo(models.tbl_rooms, {foreignKey: 'tbl_rooms'})
    }
  }
  tbl_reservation.init({
    reservation_id:{
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
    room_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tbl_rooms',
        key: 'room_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'tbl_reservations',
    timestamps: true
  });
  return tbl_reservation;
};