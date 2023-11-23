const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        senderId: {
            type: String,
        },
        content: {
            type: String,
        },
        encrypted: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", MessageSchema);