import { Expose, instanceToPlain, plainToInstance } from "class-transformer";
import { IsString } from "class-validator";
import { UserResponseDto as UserResponseDtoInterface } from "@repo/interfaces";
import { User } from "@api/entities/user";

export class UserResponseDto implements UserResponseDtoInterface {
  @Expose()
  id: number;

  @Expose()
  displayName: string;

  @Expose()
  email: string;

  @Expose()
  avatarUrl: string;

  @Expose()
  createdAt: Date;

  static fromEntity(entity: User) {
    return plainToInstance(UserResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  toJSON() {
    return instanceToPlain(this);
  }
}

export class LoginDto {
  @IsString()
  email: string;

  toEntity() {
    const user = new User();
    user.email = this.email;
    return user;
  }
}
