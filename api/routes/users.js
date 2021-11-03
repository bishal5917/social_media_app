const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//update user -api
router.put('/updateuser/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        //if passw is said to be updated,we have to hash again, if others they are updated by set
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })//new:true must be done to get updated response
            res.status(200).send(updatedUser)
        } catch (error) {
            res.status(200).send(error)
        }
    }
    else {
        res.status(401).send("You can only update your account")
    }
})


//delete user- api
router.delete('/deleteuser/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).send("User has been deleted")
        } catch (error) {
            res.status(500).send(error)
        }
    }
    else {
        res.status(401).send("You can only delete your account")
    }
})

//search a user
router.get('/search',async (req,res)=>{
    searchfield=req.query.username
    try {
        const response=await User.find({username:{$regex:searchfield,$options:'$i,$x'}})
        res.status(200).send(response)
    } catch (error) {
        res.status(500).json(error)
    }
})
//getting a user
router.get("/getuser", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password,...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//follow user -api 
router.put('/follow/:id', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const userToFollow = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!currentUser.following.includes(req.params.id)) {
                await userToFollow.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { following: req.params.id } })
                res.status(200).send("Followed")
            }
            else {
                res.status(403).send("Already Followed")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("You cant follow Yourself")
        // 403 = forbidden
    }
})


//unfollow user - api
router.put('/unfollow/:id', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const userToUnfollow = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (currentUser.following.includes(req.params.id)) {
                await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { following: req.params.id } })
                res.status(200).send("UnFollowed")
            }
            else {
                res.status(403).send("Already UnFollowed")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("You cant unfollow Yourself")
        // 403 = forbidden
    }
})

module.exports = router