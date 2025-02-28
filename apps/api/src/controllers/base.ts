import packageJson from "../../package.json";
import {
  ValidateBody,
  ValidateParams,
} from "@api/decorators/request-validator";
import {
  BaseIdDto,
  BaseResponseDto,
  CreateBaseDto,
  PatchBaseDto,
} from "@api/dtos/base";
import type {
  DataAndMessageResponse,
  RequestWithBody,
  RequestWithParams,
  TypedNextFunction,
  TypedRequest,
  TypedResponse,
} from "@api/types/express";
import baseService from "@api/services/base";
import { Controller } from "@api/decorators/controller";

type VersionResponse = {
  version: string;
};

@Controller()
class BaseController {
  async list(
    req: TypedRequest,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto[]>>
  ) {
    const data = await baseService.list();
    res.json({ message: "ok", data });
  }

  @ValidateParams(BaseIdDto)
  async get(
    req: RequestWithParams<BaseIdDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto | null>>
  ) {
    const id = req.params.id;
    const data = await baseService.getById(id);
    res.json({ message: "ok", data });
  }

  @ValidateBody(CreateBaseDto)
  async create(
    req: RequestWithBody<CreateBaseDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto>>,
    next: TypedNextFunction
  ) {
    const result = await baseService.create(req.body);
    res.json({ message: "ok", data: result });
  }

  @ValidateBody(PatchBaseDto)
  @ValidateParams(BaseIdDto)
  async patch(
    req: TypedRequest<PatchBaseDto, BaseIdDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto>>
  ) {
    const data = await baseService.patch(req.params.id, req.body);
    res.json({ message: "ok", data });
  }

  async getStatus(req: TypedRequest, res: TypedResponse) {
    res.send({ message: "ok" });
  }

  async getVersion(req: TypedRequest, res: TypedResponse<VersionResponse>) {
    res.json({ version: packageJson.version });
  }
}

const baseController = new BaseController();
export default baseController;
