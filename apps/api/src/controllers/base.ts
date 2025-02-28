import type { RequestHandler, Request, Response, NextFunction } from "express";
import packageJson from "../../package.json";
import { ValidateBody } from "@api/decorators/request-validator";
import { CreateBaseDto } from "@api/dtos/base";
import type {
  TypedNextFunction,
  TypedRequest,
  TypedResponse,
} from "@api/types/express";

type CreateResponse = {
  message: string;
  body: CreateBaseDto;
};

type VersionResponse = {
  version: string;
};

class BaseController {
  @ValidateBody(CreateBaseDto)
  async create(
    req: TypedRequest<CreateBaseDto>,
    res: TypedResponse<CreateResponse>,
    next: TypedNextFunction
  ) {
    res.json({ message: "ok", body: req.body });
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
