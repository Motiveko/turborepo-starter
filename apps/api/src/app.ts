import { json, urlencoded } from "body-parser";
import express, { Router, type Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import type { DataSource } from "typeorm";
import baseController from "@api/controllers/base";
import { errorMiddleware } from "@api/middlewares/error";
import logger from "@api/lib/logger";
import { loggerMiddleware } from "@api/middlewares/logger";
import authController from "@api/controllers/auth";
import {
  googleCallbackAuthenticate,
  googleLoginHandler,
  passportMiddleware,
  passportSession,
} from "@api/middlewares/passport";
import { sessionMiddleware } from "@api/middlewares/session";
import { corsMiddleware } from "@api/middlewares/cors";
import userController from "@api/controllers/user";
import { ensureAuthenticated } from "@api/middlewares/auth";
import type { PrivateRoute } from "@api/types/express";

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
    this.express.get("/healthz", (req, res) => res.send(200));
    this.express
      .disable("x-powered-by")
      .use(loggerMiddleware)
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(helmet())
      .use(corsMiddleware)
      .use(morgan("dev"))
      .use(sessionMiddleware)
      .use(passportMiddleware)
      .use(passportSession)
      .use("/api", this.mountPublicRoutes())
      .use(ensureAuthenticated)
      .use("/api", this.mountPrivateRoutes())
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
        this.server?.close((err?: Error) => {
          err ? reject(err) : resolve();
        });
      });
    }
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }

  private mountPublicRoutes() {
    const publicRoute = Router();
    publicRoute.get("/v1/base/status", baseController.getStatus.bind(this));
    publicRoute.get("/v1/base/version", baseController.getVersion.bind(this));
    publicRoute.get("/v1/base/list", baseController.list.bind(this));
    publicRoute.get("/v1/base/:id", baseController.get.bind(this));
    publicRoute.post("/v1/base", baseController.create.bind(this));
    publicRoute.patch("/v1/base/:id", baseController.patch.bind(this));
    publicRoute.put("/v1/base/:id", baseController.put.bind(this));
    publicRoute.delete("/v1/base/:id", baseController.delete.bind(this));
    publicRoute.get("/v1/auth/google", googleLoginHandler);
    publicRoute.get(
      "/v1/auth/google/callback",
      googleCallbackAuthenticate,
      authController.googleCallback.bind(this)
    );
    publicRoute.post("/v1/auth/logout", authController.logout.bind(this));

    return publicRoute;
  }

  private mountPrivateRoutes() {
    const privateRoute = Router() as PrivateRoute;
    privateRoute.get("/v1/user", userController.get.bind(this));
    return privateRoute;
  }
}

export default App;
