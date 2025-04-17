import {
  ValidateBody,
  ValidateParams,
} from "@api/decorators/request-validator";
import type { BaseResponseDto } from "@api/dtos/base";
import { CreateBaseDto, PatchBaseDto, PutBaseDto } from "@api/dtos/base";
import type {
  RequestWithBody,
  RequestWithParams,
  TypedRequest,
  TypedResponse,
  DataAndMessageResponse,
} from "@api/types/express";
import baseService from "@api/services/base";
import { Controller } from "@api/decorators/controller";
import { IdDto } from "@api/dtos/common";
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

  @ValidateParams(IdDto)
  async get(
    req: RequestWithParams<IdDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto | null>>
  ) {
    const id = req.params.id;
    const data = await baseService.getById(id);
    res.json({ message: "ok", data });
  }

  @ValidateBody(CreateBaseDto)
  async create(
    req: RequestWithBody<CreateBaseDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto>>
  ) {
    const result = await baseService.create(req.body);
    res.json({ message: "ok", data: result });
  }

  @ValidateBody(PatchBaseDto)
  @ValidateParams(IdDto)
  async patch(
    req: TypedRequest<PatchBaseDto, IdDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto>>
  ) {
    const data = await baseService.patch(req.params.id, req.body);
    res.json({ message: "ok", data });
  }

  @ValidateBody(PutBaseDto)
  @ValidateParams(IdDto)
  async put(
    req: TypedRequest<PutBaseDto, IdDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto>>
  ) {
    const data = await baseService.put(req.params.id, req.body);
    res.json({ message: "ok", data });
  }

  @ValidateParams(IdDto)
  async delete(req: RequestWithParams<IdDto>, res: TypedResponse) {
    await baseService.remove(req.params.id);
    res.json({ message: "ok" });
  }

  getStatus(req: TypedRequest, res: TypedResponse) {
    res.send({ message: "ok" });
  }

  getVersion(req: TypedRequest, res: TypedResponse<VersionResponse>) {
    res.json({ version: packageJson.version });
  }
}

const baseController = new BaseController();
export default baseController;
