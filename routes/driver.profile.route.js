import express from 'express';
import { driverProfile } from '../controllers/driver.profile.js';
import multer from 'multer';

const upload = multer();

const driverRouter = express.Router();

const uploadFields = upload.fields([
  { name: 'cnicFront', maxCount: 1 },
  { name: 'cnicBack', maxCount: 1 },
  { name: 'carDocument', maxCount: 1 },
  { name: 'licenceFront', maxCount: 1 },
  { name: 'licenceBack', maxCount: 1 },
]);

driverRouter.post('/driver-profile', uploadFields, driverProfile);

export default driverRouter;
