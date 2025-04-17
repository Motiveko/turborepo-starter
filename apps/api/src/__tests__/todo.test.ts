import supertest from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import App from "@api/app";
import { getDatasource } from "@api/datasources";
import { UserResponseDto } from "@api/dtos/user";
import type { DataAndMessageResponse } from "@api/types/express";
import { TodoResponseDto } from "@api/dtos/todo";

describe("Todo API End-to-End Tests", () => {
  let app: App;
  let agent: supertest.Agent;
  let user: UserResponseDto;
  let createdTodoId: number | null; // 생성된 Todo ID를 저장할 변수
  const testTodoData = {
    title: "Test Todo Title",
    description: "Test Todo Description",
  };
  const updatedTodoData = {
    title: "Updated Title",
    description: "Updated Description",
  };

  beforeAll(async () => {
    app = new App({ dataSource: getDatasource(), port: 3000 });
    await app.initDatasource();
    app.mountRouter();
    agent = supertest.agent(app.getExpress());
    // login
    user = await agent
      .post("/api/v1/test/login")
      .send({ email: "test@test.com" })
      .expect(200)
      .then(
        (res) => (res.body as DataAndMessageResponse<UserResponseDto>).data
      );
  });

  afterAll(async () => {
    await agent.post("/api/v1/test/logout").send({ id: user.id }).expect(200);
    await app.cleanup();
  });

  describe("POST /api/v1/todo", () => {
    it("should return 400 if title is missing", async () => {
      await agent
        .post("/api/v1/todo")
        .send({ description: "name" })
        .expect(400);
    });

    it("should return 400 if description is missing", async () => {
      await agent.post("/api/v1/todo").send({ title: "name" }).expect(400);
    });

    it("should create a new todo item and return 201", async () => {
      const response = await agent
        .post("/api/v1/todo")
        .send(testTodoData)
        .expect(201); // 보통 생성은 201 Created를 반환합니다. API 스펙에 맞춰주세요. (200도 가능)

      const body = response.body as DataAndMessageResponse<TodoResponseDto>;
      expect(body.data).toBeDefined();
      expect(body.data.title).toBe(testTodoData.title);
      expect(body.data.description).toBe(testTodoData.description);
      expect(body.data.isDone).toBe(false); // 기본값 확인
      expect(body.data.id).toBeDefined();
      createdTodoId = body.data.id; // 생성된 ID 저장 for 다음 테스트
    });
  });

  describe("GET /api/v1/todo", () => {
    // 테스트 실행 순서 보장을 위해, 생성 테스트 후에 실행되도록 describe로 묶거나 의존성 명시 필요
    // Jest는 기본적으로 파일 내 테스트 순서를 보장하지만, 명시적으로 관리하는 것이 좋습니다.
    // 여기서는 간단히 순서대로 작성했다고 가정합니다.

    it("should retrieve all todo items", async () => {
      // 조회 테스트 전에 하나 생성 (혹은 beforeEach 사용)
      if (!createdTodoId) {
        const createRes = await agent
          .post("/api/v1/todo")
          .send(testTodoData)
          .expect(201);
        createdTodoId = (
          createRes.body as DataAndMessageResponse<TodoResponseDto>
        ).data.id;
      }

      const response = await agent.get("/api/v1/todo").expect(200);
      const body = response.body as DataAndMessageResponse<TodoResponseDto[]>;
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBeGreaterThan(0);

      // 방금 생성한 아이템이 포함되어 있는지 확인
      const foundItem = body.data.find((item) => item.id === createdTodoId);
      expect(foundItem).toBeDefined();
      expect(foundItem?.title).toBe(testTodoData.title);
    });

    it("should retrieve a specific todo item by ID", async () => {
      // 특정 아이템 조회 전 생성 보장
      if (!createdTodoId) {
        const createRes = await agent
          .post("/api/v1/todo")
          .send(testTodoData)
          .expect(201);
        createdTodoId = (
          createRes.body as DataAndMessageResponse<TodoResponseDto>
        ).data.id;
      }

      const response = await agent
        .get(`/api/v1/todo/${createdTodoId}`)
        .expect(200);
      const body = response.body as DataAndMessageResponse<TodoResponseDto>;
      expect(body.data).toBeDefined();
      expect(body.data.id).toBe(createdTodoId);
      expect(body.data.title).toBe(testTodoData.title);
    });

    it("should return 404 for a non-existent todo item ID", async () => {
      const nonExistentId = 999999; // 존재하지 않을 ID
      await agent.get(`/api/v1/todo/${nonExistentId}`).expect(404);
    });
  });

  describe("PATCH /api/v1/todo/:id", () => {
    it("should update an existing todo item", async () => {
      // 업데이트 테스트 전 생성 보장
      if (!createdTodoId) {
        const createRes = await agent
          .post("/api/v1/todo")
          .send(testTodoData)
          .expect(201);
        createdTodoId = (
          createRes.body as DataAndMessageResponse<TodoResponseDto>
        ).data.id;
      }

      const response = await agent
        .patch(`/api/v1/todo/${createdTodoId}`)
        .send(updatedTodoData)
        .expect(200); // 또는 200 OK

      const body = response.body as DataAndMessageResponse<TodoResponseDto>;
      expect(body.data).toBeDefined();
      expect(body.data.id).toBe(createdTodoId);
      expect(body.data.title).toBe(updatedTodoData.title);
      expect(body.data.description).toBe(updatedTodoData.description);

      // 업데이트 후 다시 조회해서 확인 (선택 사항)
      const getResponse = await agent
        .get(`/api/v1/todo/${createdTodoId}`)
        .expect(200);
      const getData = (
        getResponse.body as DataAndMessageResponse<TodoResponseDto>
      ).data;
      expect(getData.title).toBe(updatedTodoData.title);
    });

    it("should return 404 when trying to update a non-existent todo item", async () => {
      const nonExistentId = 999999;
      await agent
        .put(`/api/v1/todo/${nonExistentId}`)
        .send(updatedTodoData)
        .expect(404);
    });
  });

  describe("DELETE /api/v1/todo/:id", () => {
    it("should delete an existing todo item", async () => {
      // 삭제 테스트 전 생성 보장
      let todoIdToDelete = createdTodoId; // 이미 생성된 ID 사용 또는 새로 생성
      if (!todoIdToDelete) {
        const createRes = await agent
          .post("/api/v1/todo")
          .send({ title: "To be deleted", description: "..." })
          .expect(201);
        todoIdToDelete = (
          createRes.body as DataAndMessageResponse<TodoResponseDto>
        ).data.id;
      }

      await agent.delete(`/api/v1/todo/${todoIdToDelete}`).expect(200); // 또는 204 No Content

      // 삭제 후 조회를 시도하여 404가 반환되는지 확인
      await agent.get(`/api/v1/todo/${todoIdToDelete}`).expect(404);

      // createdTodoId를 사용했다면 null로 초기화 (다른 테스트 영향 방지)
      if (createdTodoId === todoIdToDelete) {
        createdTodoId = null;
      }
    });

    it("should return 404 when trying to delete a non-existent todo item", async () => {
      const nonExistentId = 999999;
      await agent.delete(`/api/v1/todo/${nonExistentId}`).expect(404);
    });
  });

  describe("toggle test", () => {
    it("should toggle the todo item", async () => {
      if (!createdTodoId) {
        const createRes = await agent
          .post("/api/v1/todo")
          .send(testTodoData)
          .expect(201);
        createdTodoId = (
          createRes.body as DataAndMessageResponse<TodoResponseDto>
        ).data.id;
      }

      const response = await agent
        .post(`/api/v1/todo/${createdTodoId}/toggle`)
        .expect(200);
      const body = response.body as DataAndMessageResponse<TodoResponseDto>;
      expect(body.data).toBeDefined();
    });
  });
});
