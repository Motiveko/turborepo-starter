import type { RequestHandler, Request, Response, NextFunction } from "express";
import packageJson from "../../package.json";
import { ValidateBody } from "@api/decorators/request-validator";
import { BaseResponseDto, CreateBaseDto } from "@api/dtos/base";
import type {
  TypedNextFunction,
  TypedRequest,
  TypedResponse,
} from "@api/types/express";
import baseService from "@api/services/base";

type CreateResponse = {
  message: string;
  body: BaseResponseDto;
};

type VersionResponse = {
  version: string;
};

class BaseController {
  async list(req: TypedRequest, res: TypedResponse<BaseResponseDto[]>) {
    const list = await baseService.list();
    res.json(list);
  }

  @ValidateBody(CreateBaseDto)
  async create(
    req: TypedRequest<CreateBaseDto>,
    res: TypedResponse<CreateResponse>,
    next: TypedNextFunction
  ) {
    const result = await baseService.create(req.body);
    res.json({ message: "ok", body: result });
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
