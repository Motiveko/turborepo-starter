import { Config } from "@api/config/env";
import App from "@api/app";
import { getDatasource } from "@api/datasources";
import logger from "@api/lib/logger";

const port = Number(Config.PORT || 5001);
const app = new App({ dataSource: getDatasource(), port });

process.on("uncaughtException", (err) => {
  logger.log(`unhandled exception (kill) message: ${err.message}`);
  logger.log(`unhandled exception (kill) stack: ${err.stack}`);
  process.exit(1);
});

logger.log("port is : ", port);

app
  .initDatasource()
  .then(() => {
    app.mountRouter();
    app.run();
  })
  .catch((e) => {
    logger.log(e);
  });
