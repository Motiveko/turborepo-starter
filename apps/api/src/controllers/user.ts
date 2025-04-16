import { Controller } from "@api/decorators/controller";
import { UserResponseDto } from "@api/dtos/user";
import type {
  DataAndMessageResponse,
  AuthenticatedTypedRequest,
  TypedResponse,
} from "@api/types/express";

@Controller()
class UserController {
  get(
    req: AuthenticatedTypedRequest,
    res: TypedResponse<DataAndMessageResponse<UserResponseDto>>
  ) {
    const user = UserResponseDto.fromEntity(req.user);
    res.json({ message: "success", data: user });
  }
}

const userController = new UserController();
export default userController;
