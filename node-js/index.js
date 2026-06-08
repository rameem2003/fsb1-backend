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
  /**
   * Get Data GET /data
   */
  if (req.url == "/data" && req.method == "GET") {
    let data = readData();
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  }

  /**
   * Add Data POST /add
   */
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
      // console.log(body.toString());

      res.statusCode = 201;
      res.end("Data received");
    });
  }

  /**
   * Update Data PUT /update/:id
   */
  if (req.url.startsWith("/update/") && req.method == "PUT") {
    let found = false;
    let id = req.url.split("/")[2];

    let body = "";

    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      let prevData = readData();
      let newData = JSON.parse(body.toString());

      let update = prevData.map((item) => {
        if (item.id == id) {
          found = true;
          return {
            ...item,
            ...newData,
          };
        }

        return item;
      });

      if (!found) {
        res.statusCode = 404;
        res.end("Data not found");
        return;
      }

      writeData(update);
      res.statusCode = 201;
      res.end("Data Updated");
    });
  }

  /**
   * Delete Data DELETE /delete/:id
   */

  if (req.url.startsWith("/delete/") && req.method == "DELETE") {
    let id = req.url.split("/")[2];

    let prevData = readData();

    let updatedData = prevData.filter((item) => item.id != id);
    if (updatedData.length == prevData.length) {
      res.statusCode = 404;
      res.end("Data not found");
      return;
    }

    writeData(updatedData);
    res.statusCode = 200;
    res.end("Data Deleted");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
