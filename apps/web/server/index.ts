import path from "node:path";
import { log } from "@repo/logger";
import express from "express";

const app = express();

log(path.join(__dirname, ".."));
// eslint-disable-next-line import/no-named-as-default-member -- express only
const expressStaticMiddlewares = express.static(path.join(__dirname, ".."), {
  index: false,
});
const port = process.env.PORT || 3001;

app.use(expressStaticMiddlewares);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(port, () => {
  log(`web server running on ${port}`);
});
