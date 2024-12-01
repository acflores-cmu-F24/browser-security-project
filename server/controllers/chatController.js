import express from 'express';
import chatModel from '../models/chatModel.js'

const chatRouter = express.Router();

//this renders the page with messages
chatRouter.get('/chat', async (req, res) => {
    try {
        const chats = await chatModel.find();
        console.log(chats)
        res.render('chat', { messages: chats, currentUser: "scoobydoo" })
    } catch (error) {
        res.render('chat', { messages: [], currentUser: "scoobydoo" })
    }
})

chatRouter.post('/chats', async (req, res) => {
    try {
        const { sender, text, timestamp } = req.body;
        const newMsg = new chatModel({ sender, text, timestamp })
        let newMsgResult = await newMsg.save();
        if (newMsgResult.status == 400) {
            res.status(400).json(newMsgResult.message)
        }
        res.status(201).json({ "chatPublished": true });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
})

chatRouter.get('/chats', async (req, res) => {
    try {
        const chats = await chatModel.find();
        console.log(chats)
        res.render('chat', { messages: chats, currentUser: "scoobydoo" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

export default chatRouter;
