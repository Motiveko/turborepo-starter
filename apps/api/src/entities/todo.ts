import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "@api/entities/user";
import { Todo as TodoInterface } from "@repo/interfaces";

@Entity({ name: "Todo" })
export class Todo implements TodoInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "boolean" })
  isDone: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.todos, {
    onDelete: "CASCADE", // user 삭제시 todo도 삭제
    nullable: false,
  })
  user: User;

  patch(dto: Partial<Pick<typeof this, "title" | "description">>) {
    Object.assign(this, dto);
    return this;
  }
}
