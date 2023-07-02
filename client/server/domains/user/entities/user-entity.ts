import { IsDate, IsEmail } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Mood } from "../../mood/entities/mood-entity";
import { Tag } from "../../tags/entities/tag-entity";

export interface UserSettings {
  hasFinishedTutorial: boolean;
  hasCompanion: boolean;
  hasGoogleFitness: boolean;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  authId!: string;

  @Column({ nullable: true })
  nickname!: string | null;

  @Index({ unique: true })
  @IsEmail()
  @Column("varchar")
  email!: string;

  @Column()
  pictureUrl!: string;

  @Column({
    type: "jsonb",
    default: {
      hasFinishedTutorial: false,
      hasCompanion: false,
      hasGoogleFitness: false,
    },
  })
  public settings!: UserSettings;

  @OneToMany("Mood", "user", {
    onDelete: "CASCADE",
  })
  moods!: Mood[];

  @OneToMany("Tag", "user", {
    onDelete: "CASCADE",
  })
  tags!: Tag[];

  @Column({ default: "" })
  refreshToken!: string;

  @IsDate()
  @Column()
  lastLogin!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ default: 0 })
  currentStreak!: number;

  @Column({ default: 0 })
  longestStreak!: number;

  @UpdateDateColumn()
  updatedAt?: Date;
}
