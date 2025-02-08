import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.env.MODE || "production";
const port = process.env.PORT || 3000;
const app = express();

const name = process.env.NAME; // <-- NEW
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  const title = "Home Page";
  const content = "<h1>Welcome to the Home Page</h1>";
  res.render("index", { title, content, mode, port });
});

// About page
app.get("/about", (req, res) => {
  const title = "About Page";
  const content = "<h1>Welcome to the About Page</h1>";
  res.render("index", { title, content, mode, port });
});

// Contact page
app.get("/contact", (req, res) => {
  const title = "Contact Page";
  const content = "<h1>Welcome to the Contact Page</h1>";
  res.render("index", { title, content, mode, port });
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

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
