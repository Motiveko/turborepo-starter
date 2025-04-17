import { Controller } from "@api/decorators/controller";
import type {
  DataAndMessageResponse,
  AuthenticatedTypedRequest,
  TypedResponse,
  AuthenticatedRequestWithParams,
} from "@api/types/express";
import todoService from "@api/services/todo";
import type { TodoResponseDto } from "@api/dtos/todo";
import {
  ValidateBody,
  ValidateParams,
} from "@api/decorators/request-validator";
import { PatchTodoDto, CreateTodoDto } from "@api/dtos/todo";
import { IdDto } from "@api/dtos/common";

@Controller()
class TodoController {
  async list(
    req: AuthenticatedTypedRequest,
    res: TypedResponse<DataAndMessageResponse<TodoResponseDto[]>>
  ) {
    const data = await todoService.list(req.user.id);
    res.status(200).json({ message: "ok", data });
  }

  @ValidateParams(IdDto)
  async get(
    req: AuthenticatedRequestWithParams<IdDto>,
    res: TypedResponse<DataAndMessageResponse<TodoResponseDto>>
  ) {
    const data = await todoService.get(req.user.id, req.params.id);
    res.status(200).json({ message: "ok", data });
  }

  @ValidateBody(CreateTodoDto)
  async create(
    req: AuthenticatedTypedRequest<CreateTodoDto>,
    res: TypedResponse<DataAndMessageResponse<TodoResponseDto>>
  ) {
    const data = await todoService.create(req.user.id, req.body);
    res.status(201).json({ message: "ok", data });
  }

  @ValidateBody(PatchTodoDto)
  @ValidateParams(IdDto)
  async patch(
    req: AuthenticatedTypedRequest<PatchTodoDto, IdDto>,
    res: TypedResponse<DataAndMessageResponse<TodoResponseDto>>
  ) {
    const data = await todoService.patch(req.user.id, req.params.id, req.body);
    res.status(200).json({ message: "ok", data });
  }

  @ValidateParams(IdDto)
  async delete(
    req: AuthenticatedRequestWithParams<IdDto>,
    res: TypedResponse<DataAndMessageResponse<TodoResponseDto>>
  ) {
    const data = await todoService.delete(req.user.id, req.params.id);
    res.status(200).json({ message: "ok", data });
  }

  @ValidateParams(IdDto)
  async toggleDone(
    req: AuthenticatedRequestWithParams<IdDto>,
    res: TypedResponse<DataAndMessageResponse<TodoResponseDto>>
  ) {
    const data = await todoService.toggleDone(req.user.id, req.params.id);
    res.status(200).json({ message: "ok", data });
  }
}

const todoController = new TodoController();
export default todoController;
