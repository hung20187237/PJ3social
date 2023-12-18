const router = require("express").Router();
const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')

//create a comment
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});



// get a reply
router.put("/:id/reply", async (req, res) => {
  const {descreply, userreplyId} = req.body.reply;
  try {
    const comment = await Comment.findById(req.params.id);
    const reply = await comment.updateOne({ $push: {reply: { descreply, userreplyId }} });
    const comment1 = await Comment.findById(req.params.id);
    res.status(200).json(comment1);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    console.log(comment.userId)
    console.log(req.body.userId)
    if (comment.userId == req.body.userId) {
      await comment.deleteOne();
      res.status(200).json("the comment has been deleted");
    } else {
      res.status(403).json("you can delete only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//get all comments
router.get("/all", async (req, res) => {
  console.log('Comment', Comment)
  try {
    const comments = await Comment.find();
    console.log('comments', comments)
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get comments on post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    const users = []
    for(let i=0;i<comments.length;i++){
      const user = await User.findById(comments[i].userId)
      users.push(user)
    }
    res.status(200).json({comments,users});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;