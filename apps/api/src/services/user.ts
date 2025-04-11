import type { Profile } from "passport-google-oauth20";
import { getDatasource } from "@api/datasources";
import { User } from "@api/entities/user";
import { GoogleProfileDto } from "@api/dtos/google-profile";

const userRepository = getDatasource().getRepository(User);
class UserService {
  async findOrCreate(profile: Profile) {
    if (!profile.emails) {
      throw new Error("이메일이 없습니다."); // 500;
    }

    // 1. 이메일로 사용자 조회
    const userFound = await userRepository.findOne({
      where: { email: profile.emails[0].value },
    });

    if (userFound) {
      // update user
      const googleProfile = GoogleProfileDto.fromProfile(profile);
      userFound.patch(googleProfile);
      await userRepository.save(userFound);

      return userFound;
    }

    // 2. 사용자가 없으면 생성
    const googleProfile = GoogleProfileDto.fromProfile(profile);
    const user = googleProfile.toEntity();
    await userRepository.save(user);

    return user;
  }

  async getById(id: number) {
    return userRepository.findOne({ where: { id } });
  }
}
const userService = new UserService();
export default userService;
