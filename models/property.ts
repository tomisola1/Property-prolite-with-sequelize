'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

import db from "../config/config1"

interface PropertyAttributes {
  id: number;
  owner: number;
  status: string;
  price: string;
  state: string;
  city: string;
  address: string;
  type: string;
  image_url: string
}
export class Property extends Model<PropertyAttributes> implements PropertyAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
      id!: number;
    owner!: number;
    status!: string;
    price!: string;
    state!: string;
    city!: string;
    address!: string;
    type!: string;
    image_url!: string
  };
  Property.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    owner: {
      type: DataTypes.NUMBER,
      references: {
        model: "user",
        key:"id"
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available"
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize: db,
    modelName: 'Property',
  });
 