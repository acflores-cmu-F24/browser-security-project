import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.get('/chat', chatController.getChatPage);

export default router;