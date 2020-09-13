const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
// knex docs: http://knexjs.org/#Installation-node
const knex = require("knex");

// importing controllers
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "asin0ura",
    database: "smart-brain",
  },
});

db.select("*")
  .from("users")
  .then((data) => {});

const app = express();
app.use(express.json()); // to parse request into json
app.use(cors());

app.get("/", (req, res) => {});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

// bcrypt-nodejs docs: https://www.npmjs.com/package/bcrypt-nodejs
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
