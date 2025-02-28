import "@api/config/env";
import { log } from "@repo/logger";
import App from "@api/app";
import { getDatasource } from "@api/datasources";
import { Config } from "@api/config/env";

const port = Number(Config.PORT || 5001);
const app = new App({ dataSource: getDatasource(), port });

process.on("uncaughtException", (err) => {
  log(`unhandled exception (kill) message: ${err.message}`);
  log(`unhandled exception (kill) stack: ${err.stack}`);
  process.exit(1);
});
log("port is : ", port);

app
  .initDatasource()
  .then(() => {
    app.mountRouter();
    app.run();
  })
  .catch((e) => {
    log(e);
  });
