'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

import db from "../config/config1"

interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  phoneNumber: string;
  email: string;
  address: string,
  password: string,
  is_admin: boolean
}


export class users extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
    id!: number;
   first_name!: string;
   last_name!: string;
   phoneNumber!: string;
   email!: string;
   address!: string;
   password!: string;
   is_admin!: boolean
  };
  users.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    is_admin:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize: db,
    modelName: 'users',
  });

