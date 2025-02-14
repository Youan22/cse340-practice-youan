import { Router } from "express";

const router = Router();

// Home Page Route
router.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

// About Page Route (Ensure this exists!)
router.get("/about", (req, res) => {
  res.render("about", { title: "About Me" });
});

export default router;
