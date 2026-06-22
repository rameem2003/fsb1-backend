import fs from "fs";
import path from "path";

const DATA_SOURCE = path.join(import.meta.dirname, "../", "data.json");
const readData = () => {
  let data = fs.readFileSync(DATA_SOURCE, "utf-8");

  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_SOURCE, JSON.stringify(data));
};

export { readData, writeData };
