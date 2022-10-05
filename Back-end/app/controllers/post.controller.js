const db = require("../models");
const Post = db.post;
const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;
exports.createNewRestaurant = (req, res) => {
  db.user.findById({ _id: req.body.userId }, function (err, docs) {
    let userpost = docs.username;
    var post = {
      userPost: userpost,
      userPostId: docs._id,
      restaurantName: req.body.name,
      address: req.body.address,
      description: req.body.description,
      picture: {
        data: fs.readFileSync(
          path.join(process.cwd() + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    };

    Post.create(post, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        // item.save();
        db.user.findOneAndUpdate(
          { _id: req.body.userId },
          {
            $push: { posts: item._id },
          },
          function (error, success) {
            if (error) {
              console.log(error);
            } else {
              res.send(item);
            }
          }
        );
      }
    });
  });
};

exports.updateRestaurant = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      userPost: req.body.username,
      userPostId: new ObjectId(req.body.userId),
      restaurantName: req.body.name,
      address: req.body.address,
      description: req.body.description,
      picture: {
        data: fs.readFileSync(
          path.join(process.cwd() + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send({
          _id: new ObjectId(req.body.postId),
          userPost: req.body.username,
          userPostId: new ObjectId(req.body.userId),
          restaurantName: req.body.name,
          address: req.body.address,
          description: req.body.description,
          picture: {
            data: fs.readFileSync(
              path.join(process.cwd() + "/uploads/" + req.file.filename)
            ),
            contentType: "image/png",
          },
        });
      }
    }
  );

  // Post.findById({ _id: req.body.postId }, function (err, post) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(post);
  //     res.send(post);
  //   }
  // });
};

exports.getAllUserPost = (req, res) => {
  User.findById(req.query.userId)
    .populate("posts")
    .exec(function (err, userPost) {
      if (err) return;
      else res.send(userPost);
      // prints "The author is Ian Fleming"
    });
};

exports.getAllPost = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send(posts);
    }
  });
};
exports.deletePost = (req, res) => {
  Post.findOneAndDelete(
    { _id: new mongoose.Types.ObjectId(req.query.ids) },
    (err, post) => {
      if (!err) {
        res.json({ msg: "customer deleted", deleted: post });
      } else {
        console.log("Error removing :" + err);
      }
    }
  );
};
