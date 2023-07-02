import { IsDate, IsEnum, ValidateNested } from "class-validator";
import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { getManager, getRepository, In, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { Tag } from "../../tags/entities/tag-entity";
import { TagInputType, TagType } from "../../tags/graphql/tag-type";
import { User } from "../../user/entities/user-entity";
import { Emotion, Mood } from "../entities/mood-entity";
import { MoodType } from "./mood-type";
import { DateTime as time } from "luxon";

@InputType()
export class AddMoodInputType {
  @IsEnum(Emotion)
  @Field(type => Emotion)
  emotion!: Emotion;

  @IsDate()
  @Field()
  date!: Date;

  @Field()
  description!: string;

  @Field(type => [TagInputType])
  @ValidateNested()
  tags!: TagType[];
}

@Resolver()
export class AddMoodMutation {
  private moodRepository = getRepository("Mood") as Repository<Mood>;
  private tagRepository = getRepository("Tag") as Repository<Tag>;
  private userRepository = getRepository("User") as Repository<User>;

  @Authorized()
  @Mutation(returns => MoodType)
  async addMood(@Arg("data") data: AddMoodInputType, @Ctx() context: ServerContext): Promise<Mood> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }
    const tags = await this.tagRepository.find({
      where: { name: In(data.tags.map(tag => tag.name)), user: context.user },
    });

    try {
      const mood = this.moodRepository.create();
      mood.user = context.user;
      mood.emotion = data.emotion;
      mood.date = data.date;
      mood.description = data.description;

      mood.tags = tags;

      for (const tag of data.tags) {
        if (!tags.find(existingTag => existingTag.name === tag.name)) {
          const newTag = this.tagRepository.create();
          newTag.name = tag.name;
          newTag.icon = "";
          newTag.user = context.user;
          await this.tagRepository.save(newTag);
          mood.tags = [...mood.tags, newTag];
        }
      }

      // for streak calculations
      const lastAddedMood = await this.moodRepository.findOne({
        relations: ["user"],
        where: { user: { authId: context.authId } },
        order: { date: "DESC" },
      });

      if (!lastAddedMood) {
        context.user.currentStreak++;
        context.user.longestStreak++;
        console.log("i get here");
      } else {
        const todayDate = time.now().startOf("day");
        const lastAddedMoodDate = time.fromJSDate(lastAddedMood.date).startOf("day");
        const differenceInDays = todayDate.diff(lastAddedMoodDate, "days").toObject().days;

        if (differenceInDays === 1) {
          context.user.currentStreak++;
        }

        if (differenceInDays && differenceInDays > 1) {
          context.user.currentStreak = 0;
        }

        if (context.user.currentStreak > context.user.longestStreak) {
          context.user.longestStreak = context.user.currentStreak;
        }
        console.log({
          streak: context.user.currentStreak,
          long: context.user.longestStreak,
          differenceInDays,
        });
      }

      // TODO TRANSACTION
      await this.userRepository.save(context.user);
      return this.moodRepository.save(mood);
    } catch (e) {
      throw new Error("Could not save");
    }
  }
}
