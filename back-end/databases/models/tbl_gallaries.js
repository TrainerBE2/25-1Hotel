'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_gallaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_rooms, {foreignKey: 'room_id'})
    }
  }
  tbl_gallaries.init({
    gallaries_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    room_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tbl_rooms',
        key: 'room_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    gal_image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbl_gallaries',
    timestamps: true
  });
  return tbl_gallaries;
};