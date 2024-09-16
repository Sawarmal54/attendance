import express from 'express';
import {createWorkerAndAddToBoss} from '../controllers/worker.controller.js';
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.post('/addworker', verifyToken, createWorkerAndAddToBoss);

export default router;