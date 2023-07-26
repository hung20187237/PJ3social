const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      const updateUser = await User.findById(req.params.id)
      res.status(200).json(updateUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// get a user 
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
//searchtextsearch
router.get("/textSearch/", async (req, res) => {
  const searchText = req.query.searchText;
  try {
    const users = await User.find({ username: { $regex: searchText } });
    const posts = await Post.find({ title: { $regex: searchText } });
    const postsByPlace = await Post.find({ place: { $regex: searchText } });
    const result = [...users, ...posts, ...postsByPlace]
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search users' });
  }
});
//get all user
  router.get("/all/all/all", async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//get followings
router.get("/followings/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followings = await Promise.all(
      user.followings.map((followingId) => {
        return User.findById(followingId);
      })
    );
    let followingList = [];
    followings.map((following) => {
      const { _id, username, avatar } = following;
      followingList.push({ _id, username, avatar });
    });
    res.status(200).json(followingList)
  } catch (err) {
    res.status(500).json(err);
  }
});

// save a post
router.put("/:id/save", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user.savedposts.includes(req.body.postId)) {
      await user.updateOne({ $push: { savedposts: req.body.postId} });
      res.status(200).json("The post has been saved");
    } else {
      await user.updateOne({ $pull: { savedposts: req.body.postId} });
      res.status(200).json("The post has been unsaved");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get save post
router.get("/savepost/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const savedposts = await Promise.all(
      user.savedposts.map((savepostId) => {
        return Post.findById(savepostId);
      })
    );
    let postList = [];
    savedposts.map((post) => {
      const { _id, img, title, place, rating } = post;
      postList.push({ _id, img, title, place, rating });
    });
    
    res.status(200).json(postList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, avatar } = friend;
      friendList.push({ _id, username, avatar });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});


//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

//add friend
router.put("/:id/addfriend", async (req, res) => {
    try {
      const receiveUser = await User.findById(req.params.id);
      const sendUser = await User.findById(req.body.userId);
      if (!receiveUser.friends.includes(req.body.userId)) {
        await receiveUser.updateOne({ $push: { friends: req.body.userId } });
        await sendUser.updateOne({ $push: { friends: req.params.id } });
        res.status(200).json("add friend successfully");
      } else {
        res.status(403).json("you have already been this user's friend");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

//unfriend
router.put("/:id/unfriend", async (req, res) => {
  try {
    const receiveUser = await User.findById(req.params.id);
    const sendUser = await User.findById(req.body.userId);
    if (receiveUser.friends.includes(req.body.userId)) {
      await receiveUser.updateOne({ $pull: { friends: req.body.userId } });
      await sendUser.updateOne({ $pull: { friends: req.params.id } });
      res.status(200).json("unfriend successfully");
    } else {
      res.status(403).json("you have not already been this user's friend");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;