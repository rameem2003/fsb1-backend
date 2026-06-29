import express from "express";
import auth from "./router/auth.js";

const app = express();
app.use(express.json());
app.use(auth);

//
app.get("/", (req, res) => {
  // throw new Error("This is a test error");
  res.send("Hello World");
});

// not found route
app.use((req, res) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
  });
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
