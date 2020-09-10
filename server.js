const express = require("express");

const app = express();
app.use(express.json()); // to parse request into json

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
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

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
API structure:
/ --> res = this is working

signin is not PUT(update) because each time, user info should be secure with HTTP encoding
/signin ==> POST = signin success/fail
/register --> POST = user

each user has rank
/profile/:userId --> GET = user
/image --> PUT = user
*/
