const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();

const User = require("./models/User");

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.use(express.json());
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.send(err));
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

app.post("/api/add_user", (req, res) => {
  const { name, lastName, email, phone } = req.body;
  const newUser = new User({ name, lastName, email, phone });
  newUser
    .save()
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  err
    ? console.error(err)
    : console.log(`The server is running on port ${PORT}`);
});
