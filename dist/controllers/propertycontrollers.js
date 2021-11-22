"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getPropertyOfSpecificType = exports.getSpecificProperty = exports.deleteProperty = exports.getAllProperty = exports.updateProperty = exports.createProperty = void 0;
const database_1 = require("../database/database");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
async function createProperty(req, res) {
    var _a;
    try {
        const img_Url = await cloudinary_1.default.uploader.upload(((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || req.body.image_Url).catch(() => {
            return null;
        });
        console.log(img_Url);
        const { id } = req.user;
        const { price, state, city, address, type } = req.body;
        const status = "available";
        const created_at = new Date();
        const owner = id;
        const image_Url = req.body.image_Url || (img_Url === null || img_Url === void 0 ? void 0 : img_Url.secure_url);
        const data = {
            owner,
            status,
            price,
            state,
            city,
            address,
            type,
            created_at,
            image_Url,
        };
        database_1.pool.query("INSERT INTO property (owner,status,price,state,city,address,type,created_at,image_Url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [id, status, price, state, city, address, type, created_at, image_Url], (error, result) => {
            if (error) {
                console.log(error);
            }
            return res.status(201).send({
                status: "success",
                data,
            });
        });
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
}
exports.createProperty = createProperty;
function updateProperty(req, res) {
    try {
        let image;
        const propertyId = req.params.id;
        const { id } = req.user;
        database_1.pool.query("SELECT * FROM property WHERE id = $1 AND owner = $2", [propertyId, id], async (error, result) => {
            var _a;
            if (error) {
                console.log(error);
                throw error;
            }
            // console.log(result);
            if (result.rows.length === 0) {
                res.send("there is no property with this id");
            }
            // console.log(result.rows);
            const { price, state, city, address, type, image_url } = result.rows[0];
            if (req.file) {
                const img_Url = await cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                console.log(img_Url);
                image = img_Url.secure_url;
                console.log(image);
            }
            database_1.pool.query("UPDATE property SET(price,state,city,address,type,image_Url)= ($1,$2,$3,$4,$5,$6)", [
                req.body.price || price,
                req.body.state || state,
                req.body.city || city,
                req.body.address || address,
                req.body.type || type,
                image || image_url,
            ], (error, result) => {
                if (error) {
                    throw error;
                }
                console.log(result);
                if (result.rowCount > 0) {
                    return res.send({
                        status: "success",
                    });
                }
                else {
                    return "update failed";
                }
            });
        });
    }
    catch (error) {
        res.send(error.message);
    }
}
exports.updateProperty = updateProperty;
function getAllProperty(req, res) {
    try {
        database_1.pool.query("SELECT  property.*, email, phoneNumber FROM users JOIN property ON users.id = property.owner", (error, result) => {
            if (error) {
                throw error;
            }
            return res.send({
                status: "success",
                data: result.rows,
            });
        });
    }
    catch (error) {
        res.send(error.message);
    }
}
exports.getAllProperty = getAllProperty;
function deleteProperty(req, res) {
    try {
        const propertyId = req.params.id;
        const { id } = req.user;
        database_1.pool.query("DELETE FROM property WHERE id = $1 AND owner = $2", [propertyId, id], (error, result) => {
            if (error) {
                throw error;
            }
            return res.send({
                status: "deleted successfully",
                data: result.rows,
            });
        });
    }
    catch (error) {
        res.send(error.message);
    }
}
exports.deleteProperty = deleteProperty;
function getSpecificProperty(req, res) {
    try {
        const propertyId = req.params.id;
        database_1.pool.query("SELECT property.*, email, phoneNumber FROM users JOIN property ON users.id = property.owner WHERE property.id = $1", [propertyId], (error, result) => {
            if (error) {
                throw error;
            }
            return res.send({
                status: "success",
                data: result.rows,
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}
exports.getSpecificProperty = getSpecificProperty;
function getPropertyOfSpecificType(req, res) {
    try {
        const { type } = req.query;
        database_1.pool.query("SELECT property.*, email, phoneNumber FROM users JOIN property ON users.id = property.owner WHERE type = $1", [type], (error, result) => {
            if (error) {
                throw error;
            }
            return res.send({
                status: "success",
                data: result.rows,
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}
exports.getPropertyOfSpecificType = getPropertyOfSpecificType;
function updateStatus(req, res) {
    try {
        const propertyId = req.params.id;
        const { id } = req.user;
        database_1.pool.query(`UPDATE property SET status=$1 WHERE owner=$2 AND id=$3`, [
            "sold",
            id,
            propertyId,
        ], (error, result) => {
            if (error) {
                console.log(error);
                throw error;
            }
            if (result.rowCount > 0) {
                return res.send({
                    status: "success",
                });
            }
            else {
                return "update failed";
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
exports.updateStatus = updateStatus;
