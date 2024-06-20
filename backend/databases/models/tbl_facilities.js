"use strict";
const { Model } = require("sequelize");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");
module.exports = (sequelize, DataTypes) => {
  class tbl_facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_rooms_categories, { foreignKey: "cat_id" });
    }
  }
  tbl_facilities.init(
    {
      facilities_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cat_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "tbl_rooms_categories",
          key: "cat_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      facilities: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "tbl_facilities",
      timestamps: true,
    }
  );
  return tbl_facilities;
};
