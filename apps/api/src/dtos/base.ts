import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Exclude, Expose, plainToInstance, Transform } from "class-transformer";
import { BaseEntity } from "@api/entities/base";

export class CreateBaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  toEntity(): BaseEntity {
    const entity = new BaseEntity();
    entity.name = this.name;
    entity.email = this.email;
    entity.password = this.password;

    return entity;
  }
}

export class BaseResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  @Transform(({ value }) => (value as Date).toISOString().split("T")[0], {
    toPlainOnly: true,
  })
  createdAt: Date;

  static fromEntity(entity: BaseEntity) {
    const dto = plainToInstance(BaseResponseDto, entity);
    return dto;
  }
}
