import { IsNotEmpty, IsString, MinLength } from "class-validator";

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
}
