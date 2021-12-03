"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getPropertyOfSpecificType = exports.getSpecificProperty = exports.deleteProperty = exports.getAllProperty = exports.updateProperty = exports.createProperty = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const property_1 = require("../../models/property");
async function createProperty(req, res) {
    var _a;
    try {
        const img_Url = await cloudinary_1.default.uploader
            .upload(((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || req.body.image_Url)
            .catch(() => {
            return null;
        });
        const { id } = req.user;
        const { price, state, city, address, type } = req.body;
        const status = "available";
        const created_at = new Date();
        const owner = id;
        const image_url = req.body.image_Url || (img_Url === null || img_Url === void 0 ? void 0 : img_Url.secure_url) || null;
        const data = {
            owner,
            status,
            price,
            state,
            city,
            address,
            type,
            created_at,
            image_url,
        };
        const property = await property_1.Property.create(data);
        return res.status(201).send({
            status: "success",
            data: { property },
        });
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
}
exports.createProperty = createProperty;
async function updateProperty(req, res) {
    var _a;
    try {
        let image;
        const propertyId = req.params.id;
        const { id } = req.user;
        const foundProperty = await property_1.Property.findOne({ where: { id: propertyId, owner: id } });
        if (!foundProperty) {
            return res.send("there is no property with this id");
        }
        const { price, state, city, address, type, image_url } = foundProperty;
        if (req.file) {
            const img_Url = await cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
            image = img_Url.secure_url;
        }
        const data = {
            price: req.body.price || price,
            state: req.body.state || state,
            city: req.body.city || city,
            address: req.body.address || address,
            type: req.body.type || type,
            image_url: image || image_url
        };
        const updatedProperty = await property_1.Property.update(data, { where: { id: propertyId }, returning: true, plain: true });
        return res.send({
            status: "success",
            data: updatedProperty[1]
        });
    }
    catch (error) {
        return res.send(error.message);
    }
}
exports.updateProperty = updateProperty;
async function getAllProperty(req, res) {
    try {
        const property = await property_1.Property.findAll();
        return res.status(200).send({
            status: "success",
            data: property,
        });
    }
    catch (error) {
        res.send(error.message);
    }
}
exports.getAllProperty = getAllProperty;
async function deleteProperty(req, res) {
    try {
        const propertyId = req.params.id;
        const { id } = req.user;
        const deletedProperty = await property_1.Property.destroy({ where: { id: propertyId, owner: id }, returning: true, plain: true });
        return res.status(200).send({
            status: "deleted successfully",
        });
    }
    catch (error) {
        res.send(error.message);
    }
}
exports.deleteProperty = deleteProperty;
async function getSpecificProperty(req, res) {
    try {
        const propertyId = req.params.id;
        const property = await property_1.Property.findOne({ where: { id: propertyId } });
        if (!property) {
            return res.status(400).send({ message: "This property does not exist" });
        }
        return res.status(200).send({
            status: "success",
            data: property,
        });
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
}
exports.getSpecificProperty = getSpecificProperty;
async function getPropertyOfSpecificType(req, res) {
    try {
        const { type } = req.query;
        const property = await property_1.Property.findAll({ where: { type: type } });
        if (property.length === 0) {
            return res.status(404).send({ message: "Property of this type does not exist" });
        }
        return res.send({
            status: "success",
            data: property,
        });
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
}
exports.getPropertyOfSpecificType = getPropertyOfSpecificType;
async function updateStatus(req, res) {
    try {
        const propertyId = req.params.id;
        const { id } = req.user;
        const foundProperty = await property_1.Property.findOne({ where: { id: propertyId, owner: id } });
        if (!foundProperty) {
            return res.send("This property does not exist");
        }
        const property = await property_1.Property.update({ status: "sold" }, { where: { id: propertyId, owner: id } });
        if (property) {
            return res.status(200).send({
                status: "success",
            });
        }
        else {
            return "update failed";
        }
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
}
exports.updateStatus = updateStatus;
