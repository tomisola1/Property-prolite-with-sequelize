'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const { Model, DataTypes } = require('sequelize');
const config1_1 = __importDefault(require("../config/config1"));
class Property extends Model {
}
exports.Property = Property;
;
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
            key: "id"
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
    sequelize: config1_1.default,
    modelName: 'Property',
});
