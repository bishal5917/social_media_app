const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

//create post -api
router.post('/createpost', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).send(error)
    }
})

//update post - api
router.put('/updatepost/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.userId === post.userId) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        }
        else {
            res.status(500).send("You can only update Your post")
        }
    } catch (error) {
        res.status(500).send(error)
    }

})


//update post - api
router.delete('/deletepost/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.userId === post.userId) {
            try {
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).send("Post deleted successfully")
            } catch (error) {
                res.status(500).json(error)
            }
        }
        else {
            res.status(500).send("You can only delete Your post")
        }
    } catch (error) {
        res.status(500).send(error)
    }

})

//get post- api
router.get('/getpost/:id', async (req, res) => {
    try {
        const gotPost = await Post.findById(req.params.id)
        res.status(200).json(gotPost)
    } catch (error) {
        res.status(500).send(error)
    }
}
)

//Like and Unlike a post
router.put('/like/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })//push will add(like)
            res.status(200).send("Liked a Post")
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } })//pull will remove(unLike)
            res.status(200).send("UnLiked a post")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

//get all posts from the timeline
router.get('/allposts/:userId', async (req, res) => {
    try {
        let currUser = await User.findById(req.params.userId)
        let currUserPosts = await Post.find({ userId: currUser._id })//here we used find only
        // because we are finding by userId not by post id

        // for map we have to use promise.all
        const followingPosts = await Promise.all(
            currUser.following.map((followedId) => {
                return Post.find({ userId: followedId })
            })
        )
        res.status(200).json(currUserPosts.concat(...followingPosts))
        //if we do ...followingPosts we will get single array
        //if we do followingPosts we will get two arrays (one for curruserPosts
        //  and another for followingPosts)
        //power of spread operator ...
    } catch (error) {
        res.status(500).json(error)
    }
})

//get user posts only from the timeline
router.get('/userposts/:username', async (req, res) => {
    try {
        let currUser = await User.findOne({ username: req.params.username })
        let currUserPosts = await Post.find({ userId: currUser._id })//here we used find only
        // because we are finding by userId not by post id

        res.status(200).json(currUserPosts)

    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router