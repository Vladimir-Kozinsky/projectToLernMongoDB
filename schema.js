const mongoose = require("mongoose")

const BlogPost = mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Post', BlogPost);