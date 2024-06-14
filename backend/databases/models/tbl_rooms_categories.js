'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_rooms_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.tbl_facilities, {foreignKey: 'cat_id'}),
      this.hasMany(models.tbl_rooms, {foreignKey: 'cat_id'})
    }
  }
  tbl_rooms_categories.init({
    cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'tbl_rooms_categories',
    timestamps: true
  });
  return tbl_rooms_categories;
};