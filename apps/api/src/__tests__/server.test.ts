import supertest from "supertest";
import { describe, it, expect, beforeAll } from "@jest/globals";
import App from "@api/app";
import { getDatasource } from "@api/datasources";

describe("Server", () => {
  let app: App;
  beforeAll(async () => {
    app = new App({ dataSource: getDatasource(), port: 3000 });
    await app.initDatasource().then(() => app.mountRouter());
  });

  it("status api", async () => {
    await supertest(app.getExpress())
      .get("/api/v1/base/status")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "ok" });
      });
  });
});
