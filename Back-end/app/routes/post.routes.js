const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/post/create",
    authJwt.verifyToken,
    upload.single("myImage"),
    controller.createNewRestaurant
  );

  app.post(
    "/post/update",
    authJwt.verifyToken,
    upload.single("myImage"),
    controller.updateRestaurant
  );

  app.get("/post/getAll", [authJwt.verifyToken], controller.getAllUserPost);
  app.get("/post/getAllPost", [authJwt.verifyToken], controller.getAllPost);
  app.delete("/post/delete", [authJwt.verifyToken], controller.deletePost);
};
