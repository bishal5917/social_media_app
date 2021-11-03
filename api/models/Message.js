const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    text: {
        type: String
    },
}, { timestamps: true }  //timestamps will  be given on creation and updation automatically
);

module.exports = mongoose.model('message', messageSchema) 
