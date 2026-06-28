import Router from "express";

const router = Router();

router.get("/api/auth/login", (req, res) => {
  res.send("Login route");
});

router.post("/api/auth/register", (req, res) => {
  res.send("Register route");
});

export default router;
