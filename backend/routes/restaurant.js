const router = require("express").Router();
const Restaurant = require('../models/Restaurant')
const Post = require('../models/Post')
const User = require('../models/User')

//create a res
router.post("/", async (req, res) => {
  const newRestaurant = new Restaurant(req.body);
  try {
    const savedRestaurant = await newRestaurant.save();
    res.status(200).json(savedRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a res
router.get("/:id", async (req, res) => {
  const resName = req.params.name;
  const resId = req.params.id;
  try {
    const restaurant = resId
       ? await Restaurant.findById(resId)
        : await Restaurant.findOne({ title: resName });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/reviewposts/:id", async (req, res) => {
  const reviewPosts = [];
  try {
    const currentRestaurant = await Restaurant.findById(req.params.id);
    await Post.map((saveid) => {
      if(saveid.title === currentRestaurant.name){
        return reviewPosts.push(Post)
      }
    });
    res.status(200).json(reviewPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;