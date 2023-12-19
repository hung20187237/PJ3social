const router = require("express").Router();
const Report = require("../models/Report");
const Post = require("../models/Post");


//create a post
router.post("/", async (req, res) => {
    const newReport = new Report(req.body);
    try {
        const savedReport = await newReport.save();
        res.status(200).json(savedReport);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all post
router.get("/all", async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;