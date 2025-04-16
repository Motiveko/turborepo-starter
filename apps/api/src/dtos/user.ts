import {
  Expose,
  instanceToPlain,
  plainToInstance,
  Transform,
} from "class-transformer";
import type { User } from "@api/entities/user";

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
