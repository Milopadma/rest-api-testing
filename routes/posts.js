const express = require('express'); //import package
const router = express.Router();
const Post = require('../models/Post'); //import model


router.get('/', (req, res) => {
    res.send('Hello Posts!');
});

router.post('/', async (req, res) => { //this is to create a new post, and save it to the db
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost)
    }catch(err){
        res.status(400).json({message: err.message})
    }
});




module.exports = router;