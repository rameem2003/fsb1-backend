import express from "express";
import readData from "./utils/fileOperation.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// let data = [
//   { id: 1, name: "Anik" },
//   { id: 2, name: "Jane" },
// ];

// localhost:3000/api/data/1
// app.get("/api/data/:id/posts/:postId", (req, res) => {
//   let id = req.params.id;
//   let postId = req.params.postId;

//   console.log(" id: ", id);
//   console.log(" postId: ", postId);
//   res.send("ok");
// });

// daraz.com/products?id=1

// daraz.com/shop?page=1

// localhost:3000/api/shop?page=1
// app.get("/api/shop", (req, res) => {
//   let page = req.query.page;

//   console.log("page: ", page);
//   res.send("ok");
// });

app.get("/api/data", (req, res) => {
  // console.log("");

  let data = readData();
  res.send(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
