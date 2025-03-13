import { json, urlencoded } from "body-parser";
import express, { Router, type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import type { DataSource } from "typeorm";
import baseController from "@api/controllers/base";
import { errorMiddleware } from "@api/middlewares/error";
import logger from "@api/lib/logger";
import { loggerMiddleware } from "@api/middlewares/logger";

interface AppOptions {
  dataSource: DataSource;
  port: number;
}

class App {
  private express: Express;
  private dataSource: DataSource;
  private port: number;
  private server: ReturnType<Express["listen"]> | null = null;

  constructor(options: AppOptions) {
    this.express = express();
    this.dataSource = options.dataSource;
    this.port = options.port;
  }

  getExpress() {
    return this.express;
  }

  mountRouter() {
    const apiRouter = Router();
    apiRouter.get("/v1/base/status", baseController.getStatus);
    apiRouter.get("/v1/base/version", baseController.getVersion);
    apiRouter.get("/v1/base/list", baseController.list);
    apiRouter.get("/v1/base/:id", baseController.get);
    apiRouter.post("/v1/base", baseController.create);
    apiRouter.patch("/v1/base/:id", baseController.patch);
    apiRouter.put("/v1/base/:id", baseController.put);
    apiRouter.delete("/v1/base/:id", baseController.delete);

    this.express.get("/healthz", (req, res) => res.send(200));

    // base router
    this.express
      .disable("x-powered-by")
      .use(loggerMiddleware)
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(helmet())
      .use(cors())
      .use(morgan("dev"))
      .use("/api", apiRouter)
      .use(errorMiddleware);
  }

  async initDatasource() {
    await this.dataSource.initialize();
  }

  run() {
    this.server = this.express.listen(this.port, () => {
      logger.log(`express running on ${this.port}`);
    });
  }

  // cleanup 메서드 추가
  async cleanup() {
    if (this.server) {
      await new Promise<void>((resolve, reject) => {
        this.server!.close((err?: Error) => (err ? reject(err) : resolve()));
      });
    }
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }
}

export default App;
