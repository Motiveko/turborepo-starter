import type { RequestHandler } from "express";
import packageJson from "../../package.json";

const getStatus: RequestHandler = (req, res) => {
  res.json({ message: "ok" });
};

const getVersion: RequestHandler = (req, res) => {
  res.json({ version: packageJson.version });
};

interface BaseController {
  getStatus: RequestHandler;
  getVersion: RequestHandler;
}

const baseController: BaseController = {
  getStatus,
  getVersion,
};

export default baseController;
