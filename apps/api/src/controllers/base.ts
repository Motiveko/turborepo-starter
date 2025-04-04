import {
  ValidateBody,
  ValidateParams,
} from "@api/decorators/request-validator";
import type { BaseResponseDto } from "@api/dtos/base";
import {
  BaseIdDto,
  CreateBaseDto,
  PatchBaseDto,
  PutBaseDto,
} from "@api/dtos/base";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- TODO: fix
import type {
  RequestWithBody,
  RequestWithParams,
  TypedNextFunction,
  TypedRequest,
  TypedResponse,
  DataAndMessageResponse,
} from "@api/types/express";
import baseService from "@api/services/base";
import { Controller } from "@api/decorators/controller";
import packageJson from "../../package.json";

interface VersionResponse {
  version: string;
}

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

  @ValidateBody(PutBaseDto)
  @ValidateParams(BaseIdDto)
  async put(
    req: TypedRequest<PutBaseDto, BaseIdDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto>>
  ) {
    const data = await baseService.put(req.params.id, req.body);
    res.json({ message: "ok", data });
  }

  @ValidateParams(BaseIdDto)
  async delete(req: RequestWithParams<BaseIdDto>, res: TypedResponse) {
    await baseService.remove(req.params.id);
    res.json({ message: "ok" });
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
