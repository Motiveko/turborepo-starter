import { Controller } from "@api/decorators/controller";
import { ValidateBody } from "@api/decorators/request-validator";
import { LoginDto, UserResponseDto } from "@api/dtos/user";
import { IdDto } from "@api/dtos/common";
import userService from "@api/services/user";
import type {
  DataAndMessageResponse,
  TypedRequest,
  TypedResponse,
} from "@api/types/express";

@Controller()
class TestController {
  @ValidateBody(LoginDto)
  async login(
    req: TypedRequest<LoginDto>,
    res: TypedResponse<DataAndMessageResponse<UserResponseDto>>
  ) {
    const user = await userService.create(req.body);
    req.logIn(user, (err) => {
      if (err) {
        throw new Error("로그인 실패");
      }
      res.json({ message: "ok", data: UserResponseDto.fromEntity(user) });
    });
  }

  @ValidateBody(IdDto)
  async logout(req: TypedRequest<IdDto>, res: TypedResponse) {
    await userService.delete(req.body.id);
    req.logout(() => {
      res.json({ message: "ok" });
    });
  }
}

const testController = new TestController();
export default testController;
