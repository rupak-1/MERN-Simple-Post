
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
const express = require('express');
const cors = require('cors');

// middleware
const app = express();
app.use(express.json());
app.use(cors())

const mongoose = require("mongoose");
const options = {
    keepAlive: true,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// mongodb+srv://<username>:<password>@cluster0.6vk0qgz.mongodb.net/?retryWrites=true&w=majority
const dbUrl = `mongodb+srv://testuser:useruser@cluster0.vaxtqvv.mongodb.net/?retryWrites=true&w=majority`;

// Mongo DB connection
mongoose.connect(dbUrl, options, (err) => {
    if (err) console.log(err);
});

// Validate DB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Mongo DB Connected successfully");
});

// Schema for Book
let Schema = mongoose.Schema;
let postSchema = new Schema(
    {
        id: {
            type: Number,
        },
        content: {
            type: String,
        }
    },
    { timestamps: true }
);

let PostModel = mongoose.model("post", postSchema);

app.get('/', (req, res) => {
    res.send('Your are lucky!! server is running...');
});



/** GET API: GETs Books from DB and returns as response */
app.get('/posts', async (req, res) => {
    try {
        let posts = await PostModel.find().sort({createdAt: -1});
        res.status(200).json({
            status: 200,
            data: posts,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});


/** POST API: Gets new post info from React and adds it to DB */
app.post('/posts', async (req, res) => {
    const inputPost = req.body;
    try {
        let post = new PostModel(inputPost);
        post = await post.save();
        res.status(200).json({
            status: 200,
            data: post,
        });
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});




/** DELETE API: Gets ID of the post to be deleted from React and deletes the post in db. 
 * Sends 400 if there is no post with given id
 * Sends 500 if there is an error while saving data to DB
 * Sends 200 if deleted successfully
 */
app.delete("/posts/:postId", async (req, res) => {
    try {
        let post = await PostModel.findByIdAndRemove(req.params.postId);
        if (post) {
            res.status(200).json({
                status: 200,
                message: "Post deleted successfully",
            });
        } 
        else {
            res.status(400).json({
                status: 400,
                message: "No Post found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});


app.listen(3001);