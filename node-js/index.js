const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");

const dataSource = path.join(__dirname, "data.json");

const createDatabase = () => {
  if (fs.existsSync(dataSource)) {
    console.log("Database already exists");
  } else {
    fs.writeFileSync(dataSource, JSON.stringify([]));
  }
};

createDatabase();

const readData = () => {
  let data = fs.readFileSync(dataSource, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataSource, JSON.stringify(data));
};

/**
 * Add Data POST /add
 */

const server = http.createServer((req, res) => {
  if (req.url == "/add" && req.method == "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      let prevData = readData();

      let chuckData = JSON.parse(body.toString());
      let newData = {
        id: crypto.randomUUID(),
        ...chuckData,
      };

      // data.push()

      prevData.push(newData);

      writeData(prevData);
      console.log(body.toString());

      res.end("Data received");
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
