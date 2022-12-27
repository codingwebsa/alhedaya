import * as fs from "fs";

export const writeData = (path, data) => {
  fs.writeFileSync(path, `export const data = ${JSON.stringify(data)}`);
};
