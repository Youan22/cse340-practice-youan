import express from "express";

const app = express();

const name = process.env.NAME; // <-- NEW

app.get("/", (req, res) => {
  res.send(`Hello, ${name}!`); // <-- UPDATED
});

app.get("/new-route", (req, res) => {
  res.send("This is a new route!");
});

app.get("/about", (req, res) => {
  res.send("This is the about page!");
});

app.get("/Home", (req, res) => {
  res.send("This is the Home page!");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
