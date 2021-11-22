"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controllers/usercontroller");
const propertycontrollers_1 = require("../controllers/propertycontrollers");
const auth_1 = require("../middleware.ts/auth");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.post('/auth/signup', usercontroller_1.userSignup);
router.post('/auth/signin', usercontroller_1.userSignin);
router.post('/property', auth_1.Auth, multer_1.upload.single('image_Url'), propertycontrollers_1.createProperty);
router.get('/property', auth_1.Auth, propertycontrollers_1.getAllProperty);
router.get('/property/type', auth_1.Auth, propertycontrollers_1.getPropertyOfSpecificType);
router.delete('/property/:id', auth_1.Auth, propertycontrollers_1.deleteProperty);
router.patch('/property/:id', auth_1.Auth, multer_1.upload.single('image_Url'), propertycontrollers_1.updateProperty);
router.patch('/property/:id/sold', auth_1.Auth, propertycontrollers_1.updateStatus);
router.get('/property/:id', auth_1.Auth, propertycontrollers_1.getSpecificProperty);
// router.post('/upload', multerUploads, (req, res) => {
//   console.log('req.file :', req.file);
//   });
exports.default = router;
