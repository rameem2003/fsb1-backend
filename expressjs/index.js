const express = require("express");
const app = express();

// / && method:get

app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).send("<h1>Hello World</h1>");
});

app.get("/data", (req, res) => {
  res.status(200).send({
    message: "Data retrieved successfully",
    data: {
      id: 1,
      name: "John Doe",
      email: "sVj0p@example.com",
    },
  });
});

app.post("/data", (req, res) => {
  // form body
  // json body
  // parameters
  // Route query
  res.send("This is a POST request to /data");
});

app.post("/add", (req, res) => {
  // json body
  console.log(req.body);
  res.send(req.body);
});

app.listen(5000, () => {
  console.log("Server is Running at 5000");
});
