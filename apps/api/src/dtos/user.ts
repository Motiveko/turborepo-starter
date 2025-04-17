import {
  Expose,
  instanceToPlain,
  plainToInstance,
  Transform,
} from "class-transformer";
import { IsString } from "class-validator";
import { User } from "@api/entities/user";

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  avatarUrl: string;

  @Expose()
  @Transform(({ value }) => (value as Date).toISOString().split("T")[0], {
    toPlainOnly: true,
  })
  createdAt: string;

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
