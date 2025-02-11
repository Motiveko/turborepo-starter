import { log } from "@repo/logger";
import express from "express";
import { createServer as createViteServer } from "vite";

const app = express();

const getViteMiddlewares = async () => {
  const viteServer = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: "spa",
  });
  return viteServer.middlewares;
};

const port = process.env.PORT || 4321;

log(`리액트 서버: http://localhost:${port}`);

app.use(await getViteMiddlewares());
app.listen(port, () => {
  log(`web server running on ${port}`);
});
