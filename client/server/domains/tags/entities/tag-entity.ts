import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Mood } from "../../mood/entities/mood-entity";
import { User } from "../../user/entities/user-entity";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  name!: string;

  @Column("text", { default: "" })
  icon!: string;

  @ManyToOne("User", "tags", {
    cascade: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @ManyToMany("Mood", "tags")
  moods!: Mood[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
