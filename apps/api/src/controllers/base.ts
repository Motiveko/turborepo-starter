import type { RequestHandler, Request, Response, NextFunction } from "express";
import packageJson from "../../package.json";
import {
  ValidateBody,
  ValidateParams,
} from "@api/decorators/request-validator";
import { BaseIdDto, BaseResponseDto, CreateBaseDto } from "@api/dtos/base";
import type {
  DataAndMessageResponse,
  RequestWithParams,
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

  @ValidateParams(BaseIdDto)
  async get(
    req: RequestWithParams<BaseIdDto>,
    res: TypedResponse<DataAndMessageResponse<BaseResponseDto | null>>
  ) {
    const id = req.params.id;
    const data = await baseService.getById(id);
    if (data) {
      res.json({ message: "ok", data });
    } else {
      res.status(404).send();
    }
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
