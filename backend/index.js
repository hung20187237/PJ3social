const express = require("express");
const app = express();

const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const commentRoute = require('./routes/comment')
const messageRoute = require('./routes/message')
const conversationRoute = require('./routes/conversation')
const friendRequestRoute = require('./routes/friendRequest')
const notificationRoute = require("./routes/notification");
const path = require("path");


dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

const storage = multer.diskStorage({
  destination:(req, file, cb)=> {
    cb(null, 'public/images')
  },
  filename:  (req, file, cb)=> {
    cb(null, Date.now()+'_' +file.originalname)
  }
})
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const mutiupload = multer({ storage: storage })
app.post("/api/mutiupload", mutiupload.array("images",12), async (req, res) => {
  try {
    return res.status(200).json({data:"File uploaded successfully",file:req.files});
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(403).json("Too many files to upload.");
    }
    return res.status(500).json(`Error when trying upload many files: ${error}`);
  }
})


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment",commentRoute);
app.use("/api/message",messageRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/friendRequest",friendRequestRoute);
app.use("/api/notification", notificationRoute);;


app.listen(8800, () => {
  console.log("Backend server is running!");
});