import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.env.MODE || "production";
const port = process.env.PORT || 3000;
const app = express();

const name = process.env.NAME; // <-- NEW

const validateId = (req, res, next) => {
  const { id } = req.params;
  console.log("ID passed:", id); // <-- Log the id value
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    const error = new Error("Invalid ID: must be a number.");
    error.status = 400;
    next(error);
    return;
  }
  req.params.id = idNumber; // Convert id to number
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.params;
  // Adjusted regex to allow spaces and numbers in the name
  if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
    const error = new Error(
      "Invalid name: must only contain letters, numbers, and spaces."
    );
    error.status = 400;
    next(error);
    return;
  }
  next();
};

// Middleware (Placed near the top before routes)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Global middleware to set a custom header
app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "Express Middleware Tutorial");
  next();
});

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
// Middleware to add timestamp
app.use((req, res, next) => {
  req.timestamp = new Date().toISOString(); // Add timestamp in ISO format
  next();
});

// Home page
app.get("/", (req, res) => {
  const title = "Home Page";
  const content = "<h1>Welcome to the Home Page</h1>";
  res.render("index", { title, content, mode, port, timestamp: req.timestamp });
});

// About page
app.get("/about", (req, res) => {
  const title = "About Page";
  const content = "<h1>Welcome to the About Page</h1>";
  res.render("index", { title, content, mode, port, timestamp: req.timestamp });
});

// Contact page
app.get("/contact", (req, res) => {
  const title = "Contact Page";
  const content = "<h1>Welcome to the Contact Page</h1>";
  res.render("index", { title, content, mode, port, timestamp: req.timestamp });
});

// Account page route with ID and name validation
app.get("/account/:name/:id", validateName, validateId, (req, res) => {
  const title = "Account Page";
  const { name, id } = req.params;
  const isEven = id % 2 === 0 ? "even" : "odd";
  const content = `
    <h1>Welcome, ${name}!</h1>
    <p>Your account ID is ${id}, which is an ${isEven} number.</p>
  `;
  res.render("index", { title, content, mode, port, timestamp: req.timestamp });
});

// Greeting route
app.get("/greet", (req, res) => {
  res.send(`Hello, ${name || "Guest"}!`);
});

// New route
app.get("/new-route", (req, res) => {
  res.send("This is a new route!");
});

// When in development mode, start a WebSocket server for live reloading
if (mode.includes("dev")) {
  const ws = await import("ws");

  try {
    const wsPort = parseInt(port) + 1;
    const wsServer = new ws.WebSocketServer({ port: wsPort });

    wsServer.on("listening", () => {
      console.log(`WebSocket server is running on port ${wsPort}`);
    });

    wsServer.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });
  } catch (error) {
    console.error("Failed to start WebSocket server:", error);
  }
}

// Error handling middleware (for invalid requests)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
