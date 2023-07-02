import { IsDate, IsEnum } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tag } from "../../tags/entities/tag-entity";
import { User } from "../../user/entities/user-entity";

export enum Emotion {
  HAPPY = "HAPPY",
  LOVED = "LOVED",
  ANXIOUS = "ANXIOUS",
  TIRED = "TIRED",
  SAD = "SAD",
  ANGRY = "ANGRY",
}

@Entity()
export class Mood {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  emotion!: string;

  @IsDate()
  @Column()
  date!: Date;

  @Column("text")
  description!: string;

  @ManyToOne("User", "moods", {
    cascade: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @ManyToMany("Tag", "moods")
  @JoinTable()
  tags!: Tag[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
