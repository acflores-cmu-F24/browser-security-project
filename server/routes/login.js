import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();

router.get('/', loginController.getLoginPage);

export default router;
