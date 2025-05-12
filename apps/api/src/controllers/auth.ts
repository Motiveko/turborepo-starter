import { OAuth2Client } from "google-auth-library";
import { Controller } from "@api/decorators/controller";
import type { TypedRequest, TypedResponse } from "@api/types/express";
import { Config } from "@api/config/env";
import { ValidateBody } from "@api/decorators/request-validator";
import {
  JwtPayloadDto,
  LoginAppRequestDto,
  LoginAppResponseDto,
} from "@api/dtos/user";
import { ValidationError } from "@api/errors/validation";
import userService from "@api/services/user";
import { GoogleProfileDto } from "@api/dtos/google-profile";
import { createToken } from "@api/lib/jwt";

const googleClient = new OAuth2Client(Config.GOOGLE_CLIENT_ID);

@Controller()
class AuthController {
  googleCallback(req: TypedRequest, res: TypedResponse) {
    res.redirect(Config.FRONTEND_URL);
  }

  @ValidateBody(LoginAppRequestDto)
  async googleOAuthApp(
    req: TypedRequest<LoginAppRequestDto>,
    res: TypedResponse<LoginAppResponseDto>
  ) {
    const { token, clientId } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      // TODO : 클라이언트마다 clientId가 다르기때문에 clientId를 요청측에서 보내도록 함. 클라이언트 타입을 받는게 맞을지는 고민 필요
      audience: clientId,
      // audience: Config.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new ValidationError("Invalid Google OAuth token");
    }

    const googleProfile = GoogleProfileDto.fromTokenPayload(payload);
    const user = await userService.findOrCreate(googleProfile);
    const jwtToken = createToken(JwtPayloadDto.fromEntity(user).toJSON());
    res.status(200).send({ accessToken: jwtToken });
  }

  logout(req: TypedRequest, res: TypedResponse) {
    req.logout(() => {
      res.send({ message: "ok" });
    });
  }
}

const authController = new AuthController();
export default authController;
