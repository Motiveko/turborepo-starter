import { getDatasource } from "@api/datasources";
import { User } from "@api/entities/user";
import { GoogleProfileDto } from "@api/dtos/google-profile";
import { LoginDto } from "@api/dtos/user";

const userRepository = getDatasource().getRepository(User);

class UserService {
  async findOrCreate(profile: GoogleProfileDto) {
    // 1. 이메일로 사용자 조회
    const userFound = await userRepository.findOne({
      where: { email: profile.email },
    });

    if (userFound) {
      // update user
      userFound.patch(profile);
      await userRepository.save(userFound);

      return userFound;
    }

    // 2. 사용자가 없으면 생성
    const user = profile.toEntity();
    await userRepository.save(user);

    return user;
  }

  async getById(id: number) {
    return userRepository.findOne({ where: { id } });
  }

  async create(user: LoginDto) {
    return userRepository.save(user.toEntity());
  }

  async delete(user: User) {
    return userRepository.remove(user);
  }
}
const userService = new UserService();
export default userService;
