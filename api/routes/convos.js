const router = require('express').Router()
const Convo = require('../models/Convo')

//saving new conversations
router.post('/',async (req,res)=>{
    const newConversation=new Convo({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {
        const savedConvo=await newConversation.save()
        res.status(200).send(savedConvo)
    } catch (error) {
        res.status(500).json(error)
    }
})

//geting conversation of a particular user with a user Id
router.get('/:id',async(req,res)=>{
    try {
        const findConversation=await Convo.find({
            members:{$in:[req.params.id]}
        })
        res.status(200).json(findConversation)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router
