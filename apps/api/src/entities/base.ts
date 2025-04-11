import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "Base" })
export class BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "text" })
  name: string;

  @Index()
  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  patch(dto: Partial<Pick<typeof this, "name" | "email" | "password">>) {
    Object.assign(this, dto);
    return this;
  }
}
