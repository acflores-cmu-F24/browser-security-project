import express from 'express';
import chatModel from '../models/chatModel.js'

const chatRouter = express.Router();

chatRouter.get('/chat', (req, res) => {
    res.render('chat', { messages:[], currentUser:"scoobydoo" })
})

chatRouter.post('/chats', async (req, res) => {
    try {
        const {sender, text, timestamp} = req.body;
        const newMsg = new chatModel({ sender, text, timestamp })
        let newMsgResult = await newMsg.save();
        if (newMsgResult.status == 400) {
            res.status(400).json(newMsgResult.message)
        }
        res.status(201).json({ "chatPublished": true });
    } catch(error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
})

chatRouter.get('/chats', async (req, res) => {
    try {
        const chats = await chatModel.find();
        res.status(200).json(chats)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

export default chatRouter;
