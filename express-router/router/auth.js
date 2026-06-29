import Router from "express";
import middleware from "../middlewares/middleware.js";

const router = Router();

router.get("/api/auth/login", (req, res) => {
  res.send("Login route");
});

router.post("/api/auth/register", (req, res) => {
  res.send("Register route");
});

router.get("/api/auth/user", middleware, (req, res) => {
  res.send("User route");
});

export default router;
