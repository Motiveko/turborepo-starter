import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
} from "class-validator";
import { plainToInstance } from "class-transformer";
import { Todo } from "@api/entities/todo";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  toEntity(): Todo {
    const todo = new Todo();
    todo.title = this.title;
    todo.description = this.description;
    todo.isDone = false;
    todo.createdAt = new Date();

    return todo;
  }
}

export class TodoResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isDone: boolean;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  static fromEntity(entity: Todo) {
    const dto = plainToInstance(TodoResponseDto, entity);
    return dto;
  }
}

export class PatchTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
