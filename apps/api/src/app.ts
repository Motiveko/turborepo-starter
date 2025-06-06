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
import todoController from "@api/controllers/todo";
import testController from "@api/controllers/test";
import { notFoundMiddleware } from "@api/middlewares/not-found";

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
      .use("/api", this.mountTestRoutes())
      .use("/api", ensureAuthenticated, this.mountPrivateRoutes())
      .use(notFoundMiddleware)
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
    publicRoute.post(
      "/v1/auth/google/app",
      authController.googleOAuthApp.bind(this)
    );
    publicRoute.post("/v1/auth/logout", authController.logout.bind(this));

    return publicRoute;
  }

  private mountPrivateRoutes() {
    const privateRoute = Router() as PrivateRoute;
    privateRoute.get("/v1/user", userController.get.bind(this));

    privateRoute.get("/v1/todo", todoController.list.bind(this));
    privateRoute.get("/v1/todo/:id", todoController.get.bind(this));
    privateRoute.post("/v1/todo", todoController.create.bind(this));
    privateRoute.patch("/v1/todo/:id", todoController.patch.bind(this));
    privateRoute.delete("/v1/todo/:id", todoController.delete.bind(this));
    privateRoute.post(
      "/v1/todo/:id/toggle",
      todoController.toggleDone.bind(this)
    );
    return privateRoute;
  }

  private mountTestRoutes() {
    // TODO : test router도 public/private 분리가 필요함.
    const testRoute = Router() as PrivateRoute;
    testRoute.post("/v1/test/login", testController.login.bind(this));
    testRoute.post("/v1/test/logout", testController.logout.bind(this));

    return testRoute;
  }
}

export default App;
