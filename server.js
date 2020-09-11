const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

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
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }

  res.json("signin");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  console.log("app profile");
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    console.log("checking/requested userId", user.id, id);
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  console.log("found", found);
  if (!found) {
    res.status(400).json("user not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    console.log("checking/requested userId", user.id, id);
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
