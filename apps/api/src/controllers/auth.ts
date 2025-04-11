import { Controller } from "@api/decorators/controller";
import type { TypedRequest, TypedResponse } from "@api/types/express";
import { Config } from "@api/config/env";

@Controller()
class AuthController {
  googleCallback(req: TypedRequest, res: TypedResponse) {
    res.redirect(Config.FRONTEND_URL);
  }

  logout(req: TypedRequest, res: TypedResponse) {
    req.logout(() => {
      res.redirect(Config.FRONTEND_URL);
    });
  }
}

const authController = new AuthController();
export default authController;
