const router = require('express').Router()
const Message = require('../models/Message')


//saving new messages
router.post('/', async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedmsg = await newMessage.save()
        res.status(200).send(savedmsg)
    } catch (error) {
        res.status(500).json(error)
    }
})


//getting messages
router.get('/:conversationId', async (req, res) => {
    try {
        const messages =await Message.find({
            conversationId:req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router