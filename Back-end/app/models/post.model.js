const mongoose = require("mongoose");
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    userPost: String,
    userPostId: mongoose.Types.ObjectId,
    restaurantName: String,
    address: String,
    description: String,
    picture: {
      data: Buffer,
      contentType: String,
    },
  })
);
module.exports = Post;
