const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
// knex docs: http://knexjs.org/#Installation-node
const knex = require("knex");

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
  .then((data) => {
    // console.log(data);
  });

const app = express();
app.use(express.json()); // to parse request into json
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      password: "cookies",
      email: "john@gmail.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      password: "bananas",
      email: "sally@gmail.com",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      has: "",
      email: "john@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(
    "bike",
    "$2a$10$J1XAHTL4TgG/GDRPCvJxleS4MJQA1mcj6kpaXYY1HMo2NTWgJy952",
    function (err, res) {
      console.log("first guess", res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$J1XAHTL4TgG/GDRPCvJxleS4MJQA1mcj6kpaXYY1HMo2NTWgJy952",
    function (err, res) {
      console.log("second guess", res);
    }
  );

  // TODO check every user
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("unable to register"));
});

app.get("/profile/:id", (req, res) => {
  console.log("app profile");
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
});

app.put("/image", (req, res) => {
  console.log("server, /image called");
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("user not found");
  }
});

// bcrypt-nodejs docs: https://www.npmjs.com/package/bcrypt-nodejs

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
