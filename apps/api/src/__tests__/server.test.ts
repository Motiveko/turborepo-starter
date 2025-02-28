import supertest from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import App from "@api/app";
import { getDatasource } from "@api/datasources";

describe("Server", () => {
  let app: App;
  beforeAll(async () => {
    app = new App({ dataSource: getDatasource(), port: 3000 });
    await app.initDatasource().then(() => app.mountRouter());
  });

  afterAll(async () => {
    await app.cleanup();
  });

  it("status api", async () => {
    await supertest(app.getExpress())
      .get("/api/v1/base/status")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "ok" });
      });
  });

  it("create test - 401", async () => {
    await supertest(app.getExpress())
      .post("/api/v1/base")
      .send({ name: "name" })
      .expect(400);
  });

  it("create test - 200", async () => {
    const base = {
      name: "name",
      email: "test@email.com",
      password: "abcd1234",
    };
    await supertest(app.getExpress())
      .post("/api/v1/base")
      .send(base)
      .expect(200)
      .then((res) => {
        expect(typeof res.body.data.id).toBe("number");
      });
  });

  it("base list - 200", async () => {
    await supertest(app.getExpress()).get("/api/v1/base/list").expect(200);
  });
});
