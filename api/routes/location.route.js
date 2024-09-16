import express from 'express';
import {createLocationAndAddToBoss} from '../controllers/location.controller.js';
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.post('/addlocation', verifyToken, createLocationAndAddToBoss);

export default router;