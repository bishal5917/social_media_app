const router=require('express').Router()
const User=require('../models/User')
const bcrypt = require('bcrypt')

//Register api
router.post('/register', async (req, res) => {
    try {
        //hasing the password to keep safe from hakers
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

//login api
router.post('/login',async (req,res)=>{
    try {
        //we will find user with the username and the password
        const user=await User.findOne({email:req.body.email})
        !user && res.status(404).send("User not found")

        //using bcrpt to compare as we have hashed the passw
        const validatedpssw=await bcrypt.compare(req.body.password,user.password)
        !validatedpssw && res.status(400).send("Wrong Password")
        // const {password,...others}=user
        const {password,...others}=user._doc  //coz we only want docs
        res.status(200).json(others)

    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router