const dbConfig = require("./app/config/db.config");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
// require('dotenv/config');
const controller = require("./app/controllers/post.controller");
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
//[express] Serving static files in express
app.use(express.static(path.join(__dirname, "public")));
//[cookie-parser] Parse cookie header
app.use(cookieParser());
//[body-parser] Parse request object as a JSON object: application/json
app.use(bodyParser.json());
//[body-parser] Parse urlencoded bodies: application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);
//`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(
    "mongodb+srv://my-restaurant:Fq61db3F9oJwhdY9@my-restaurant.znkjyyi.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.get("/", (req, res) => {
  res.json("hello world");
});
app.get("/newEndpoint", (req, res) => {
  res.send("ths is my bew end point");
});

app.post("inforSignIn", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
