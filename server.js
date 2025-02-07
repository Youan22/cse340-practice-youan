import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

const name = process.env.NAME; // <-- NEW

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/page1", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/page1.html"));
});

app.get("/page2", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/page2.html"));
});

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

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
