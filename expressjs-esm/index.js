import express from "express";
import { readData, writeData } from "./utils/fileOperation.js";
import crypto from "crypto";

const app = express();
app.use(express.json());

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

/**
 * GET /api/data
 */
app.get("/api/data", (req, res) => {
  let data = readData();
  res.status(200).send(data);
});

/**
 * POST /api/data
 */
app.post("/api/data", (req, res) => {
  let data = req.body;
  let prevData = readData();

  let newData = {
    id: crypto.randomUUID(),
    ...data,
  };

  prevData.push(newData);

  writeData(prevData);

  // console.log(newData);
  res.status(201).send({
    success: true,
    message: "Data added successfully",
    data: newData,
  });
});

/**
 * DELETE /api/data/:id
 */
app.delete("/api/data/:id", (req, res) => {
  let id = req.params.id;
  let prevData = readData();

  let newData = prevData.filter((item) => item.id !== id);

  writeData(newData);

  res.status(200).send({
    success: true,
    message: "Data deleted successfully",
  });
});

app.put("/api/data/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;

  let prevData = readData();

  let newData = prevData.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...data,
      };
    } else {
      return item;
    }
  });

  writeData(newData);

  res.status(200).send({
    success: true,
    message: "Data updated successfully",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
