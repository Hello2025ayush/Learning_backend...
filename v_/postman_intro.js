const express = require("express");
const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("email or password missing");
  }

  if (email === "test@gmail.com" && password === "123") {
    return res.status(200).send("login success");
  }

  res.status(401).send("invalid credentials");
});

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.listen(5000, () => {
  console.log("Server running");
});
