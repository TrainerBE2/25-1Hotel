'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_rooms_categories, {foreignKey: 'cat_id', as: 'type'});
    }
  }
  tbl_rooms.init({
    room_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_rooms_categories',
        key: 'cat_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status :{
      type: DataTypes.ENUM,
      values: ['Booked', 'Occupied', 'Available'],
      defaultValue: 'Available'
    },
    archived: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'tbl_rooms',
    timestamps: true
  });
  return tbl_rooms;
};