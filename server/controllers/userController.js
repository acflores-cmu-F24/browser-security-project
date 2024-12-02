import express from 'express';
import userModel from '../models/userModel.js'

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.render('login')
})

loginRouter.post('/register', async (req, res) => {
    let { username, password } = req.body
    try {
        let user = new userModel({ username, password })
        await user.save()
        res.status(201).json(`User registered`)
    } catch (error) {
        return res.status(500).json(error)
    }
})

loginRouter.post('/authenticate', async (req, res) => {
    let { username, password } = req.body
    try {
        const user = await userModel.findOne({ username })
        if (user.password == password) {
            res.status(200).send("Authenticated");
        } else {
            res.status(400).json({ message: 'wrong password' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

export default loginRouter;
