import type { RequestHandler, Request, Response, NextFunction } from "express";
import packageJson from "../../package.json";
import { ValidateBody } from "@api/decorators/request-validator";
import { BaseResponseDto, CreateBaseDto } from "@api/dtos/base";
import type {
  DataAndMessageResponse,
  TypedNextFunction,
  TypedRequest,
  TypedResponse,
} from "@api/types/express";
import baseService from "@api/services/base";

type VersionResponse = {
  version: string;
};

class BaseController {
  async list(
    req: TypedRequest,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto[]>>
  ) {
    const data = await baseService.list();
    res.json({ message: "ok", data });
  }

  @ValidateBody(CreateBaseDto)
  async create(
    req: TypedRequest<CreateBaseDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto>>,
    next: TypedNextFunction
  ) {
    const result = await baseService.create(req.body);
    res.json({ message: "ok", data: result });
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
