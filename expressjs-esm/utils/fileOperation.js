import fs from "fs";
import path from "path";
const readData = () => {
  let data = fs.readFileSync(
    path.join(import.meta.dirname, "../", "data.json"),
    "utf-8",
  );

  return JSON.parse(data);
};

export default readData;

//  file // folder

// expressjs-esm/utils/

// expressjs-esm
