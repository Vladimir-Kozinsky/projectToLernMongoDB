const express = require("express")
const mongoose = require("mongoose")
const BlogPost = require('./schema')

const app = express()

app.listen(5000, () => console.log(`SERWER WAS STARTED ON ... 5000`))

const conn = async () => {
    const connection = await mongoose.connect("mongodb+srv://user1:user@cluster0.i1mxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    console.log('Data base connected')
}

conn()

app.get('/api', function (req, res) {
    res.send('hello world')
})

