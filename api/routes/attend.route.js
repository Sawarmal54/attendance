import express from 'express';
import { markAttendance } from '../controllers/attend.controller.js';

import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/markattendance', verifyToken, markAttendance);

export default router;