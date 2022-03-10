const express = require("express"); //import package
const router = express.Router();
const Post = require("../models/Post"); //import model

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); //returns all posts
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//submit a post (using POST)
router.post("/", async (req, res) => {
  //this is to create a new post, and save it to the db
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//return a specific post (find by id using GET)
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete a specific post (find by id using DELETE)
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postId }); //remove by id
    res.json(removedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update a specific post (find by id using PATCH)
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId }, //search by ID
      { $set: { title: req.body.title } } //update the title
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
