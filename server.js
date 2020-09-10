const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("this is working");
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
