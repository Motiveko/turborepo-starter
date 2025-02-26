import { json, urlencoded } from "body-parser";
import express, { Router, type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import type { DataSource } from "typeorm";
import { log } from "@repo/logger";
import baseController from "@api/controller/base";

interface AppOptions {
  dataSource: DataSource;
  port: number;
}

class App {
  private express: Express;
  private dataSource: DataSource;
  private port: number;

  constructor(options: AppOptions) {
    this.express = express();
    this.dataSource = options.dataSource;
    this.port = options.port;
  }

  mountRouter() {
    // base router
    this.express
      .disable("x-powered-by")
      .use(morgan("dev"))
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(cors());

    const apiRouter = Router();
    apiRouter.get("/status", baseController.getStatus);
    apiRouter.get("/version", baseController.getVersion);

    this.express.use("/api", apiRouter);
  }

  async initDatasource() {
    // TODO : 서비스에서는 주석해제 후 사용
    // await this.dataSource.initialize();
  }

  run() {
    this.express.listen(this.port, () => {
      log(`express running on ${this.port}`);
    });
  }
}

export default App;
