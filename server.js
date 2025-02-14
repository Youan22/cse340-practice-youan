// Import required modules using ESM import syntax
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Import all other required modules: Route handlers, Middleware, etc.
import { configMode } from "./src/middleware/config-mode.js";
import baseRoute from "./src/routes/index.js";
import layouts from "./src/middleware/layouts.js";
import {
  notFoundHandler,
  globalErrorHandler,
} from "./src/middleware/error-handler.js";

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of an Express application
const app = express();

// Apply middleware for dynamic script & style injection
app.use(configMode);

// -------------------------
// 1) STATIC FILE SERVING
// -------------------------
app.use(express.static(path.join(__dirname, "public")));

// Define static paths for efficient 404 handling
app.set("staticPaths", ["/images", "/css", "/js"]);

// -------------------------
// 2) VIEW ENGINE SETUP
// -------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// -------------------------
// 3) LAYOUTS MIDDLEWARE
// -------------------------
app.set("layout default", "default");
app.set("layouts", path.join(__dirname, "src/views/layouts"));
app.use(layouts);

// -------------------------
// 4) ROUTES
// -------------------------
app.use("/", baseRoute);

// -------------------------
// 5) ERROR HANDLING CONFIG
// -------------------------
// Set a limit to prevent infinite error render loops
app.set("errorRenderLimit", 2);

// Use error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

// -------------------------
// 6) ENABLE LIVE RELOADING IN DEV MODE
// -------------------------
const mode = process.env.MODE || "production";
const port = process.env.PORT || 3000;

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

// -------------------------
// 7) START THE SERVER
// -------------------------
app.listen(port, () => {
  console.log(`🚀 Server running in ${mode} mode on http://127.0.0.1:${port}`);
});
