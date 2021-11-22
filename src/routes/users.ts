import express, { NextFunction,Request,Response }from 'express';
import { userSignin, userSignup } from '../controllers/usercontroller';
import {createProperty, getAllProperty,updateProperty,getPropertyOfSpecificType, getSpecificProperty,deleteProperty,updateStatus} from '../controllers/propertycontrollers'
import { Auth } from '../middleware.ts/auth';
import { pool } from '../database/database';
import { upload } from '../utils/multer';
const router = express.Router();


router.post('/auth/signup', userSignup);
router.post('/auth/signin', userSignin);
router.post('/property', Auth, upload.single('image_Url'), createProperty);
router.get('/property', Auth, getAllProperty);

router.get('/property/type', Auth, getPropertyOfSpecificType);
router.delete('/property/:id', Auth, deleteProperty);
router.patch('/property/:id', Auth,upload.single('image_Url'), updateProperty);
router.patch('/property/:id/sold', Auth, updateStatus)
router.get('/property/:id', Auth, getSpecificProperty);
// router.post('/upload', multerUploads, (req, res) => {
//   console.log('req.file :', req.file);
//   });

export default router;
