import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "@api/entities/user";

@Entity({ name: "Todo" })
export class Todo {
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

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  patch(dto: Partial<Pick<typeof this, "title" | "description">>) {
    Object.assign(this, dto);
    return this;
  }
}
