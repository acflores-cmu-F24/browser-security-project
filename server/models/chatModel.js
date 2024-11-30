import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        sender: { type: String, required: true },
        text: { type: String, required: true },
        timestamp: { type: String, required: true }
    }
);

const chatModel = mongoose.model("public_message", chatSchema);

export default chatModel
