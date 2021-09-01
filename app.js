const express = require("express")
const mongoose = require("mongoose")
const Post = require('./schema.js')
const bodyParser = require('body-parser')
const upload = require("./router");
const Grid = require("gridfs-stream");
const connection = require('./db')

const app = express()
app.use(bodyParser.json())

let gfs;
connection();

const conn = mongoose.connection

conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

app.use("/file", upload);

// app.post("/file/upload", upload.single("file"), async (req, res) => {
//     if (req.file === undefined) return res.send("you must select a file.");
//     const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
//     return res.send(imgUrl);
// });


app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});


app.get('/api', function (req, res) {
    res.send('hello world')
})

app.post('/api/post', async (req, res) => {
    const post = new Post({ ...req.body })
    await post.save()
    res.send({ ...req.body })
})

app.listen(5000, () => console.log(`SERWER WAS STARTED ON ... 5000`))