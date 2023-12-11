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
const restaurantRoute = require("./routes/restaurant");
const path = require("path");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');


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

const uploadImage = multer({ storage: storage });
app.post('/api/check-image', uploadImage.array("media", 12), async (req, res) => {
  const uploadedFile = req.files;
  try {
    const data = new FormData();
    uploadedFile.forEach((imagePath, index) => {
      data.append(`media[${index}]`, fs.createReadStream(imagePath.path));
    });
    data.append('workflow', 'wfl_fcYaLLijOa94P50zolWlw');
    data.append('api_user', '1777157158');
    data.append('api_secret', 'HFVyXMsK2mo3DqavoGECiGhNbq');

    const response = await axios({
      method: 'post',
      url: 'https://api.sightengine.com/1.0/check-workflow.json',
      data: data,
      headers: data.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    if (error.response) res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ error: error.message });
  }
});


app.post('/api/check-content', async (req, res) => {

  console.log('req.body', req.body)

  try {
    const data = new FormData();
    data.append('text', req.body.content);
    data.append('lang', 'en');
    data.append('mode', 'ml,rules');
    data.append('categories', 'drug, weapon, extremism');
    data.append('api_user', '1777157158');
    data.append('api_secret', 'HFVyXMsK2mo3DqavoGECiGhNbq');

    const response = await axios({
      method: 'post',
      url: 'https://api.sightengine.com/1.0/text/check.json',
      data: data,
      headers: data.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    if (error.response) res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ error: error.message });
  }
});




app.post('/api/translate', async (req, res) => {

  console.log('req.body', req.body)
  const apiKey = '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';
  const prompt = 'What is the meaning of life?';
  const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
  const requestData = {
    prompt,
    max_tokens: 150,
    temperature: 0.7,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  try {
    axios.post(apiUrl, requestData, { headers })
        .then(response => {
          const answer = response.data.choices[0].text.trim();
          console.log('Answer:', answer);
        })
        .catch(error => {
          console.error('Error:', error.response ? error.response.data : error.message);
        });
  } catch (error) {
    if (error.response) res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ error: error.message });
  }
});



app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment",commentRoute);
app.use("/api/message",messageRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/friendRequest",friendRequestRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/restaurant", restaurantRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});