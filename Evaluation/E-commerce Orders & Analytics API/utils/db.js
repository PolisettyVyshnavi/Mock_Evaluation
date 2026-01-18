import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

export const readDB = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

export const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};