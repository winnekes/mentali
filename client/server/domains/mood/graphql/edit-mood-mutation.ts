import { IsDate, IsEnum, ValidateNested } from "class-validator";
import { Arg, Authorized, Ctx, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { getRepository, In, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { Tag } from "../../tags/entities/tag-entity";
import { TagInputType, TagType } from "../../tags/graphql/tag-type";
import { Emotion, Mood } from "../entities/mood-entity";
import { MoodType } from "./mood-type";

@InputType()
export class EditMoodInputType {
  @Field(type => Int)
  id!: number;

  @IsEnum(Emotion)
  @Field(type => Emotion)
  emotion!: Emotion;

  @Field()
  description!: string;

  @Field(type => [TagInputType])
  @ValidateNested()
  tags!: TagType[];
}

@Resolver()
export class EditMoodMutation {
  private moodRepository = getRepository("Mood") as Repository<Mood>;
  private tagRepository = getRepository("Tag") as Repository<Tag>;

  @Authorized()
  @Mutation(returns => MoodType)
  async editMood(
    @Arg("data") data: EditMoodInputType,
    @Ctx() context: ServerContext
  ): Promise<Mood> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }

    const mood = await this.moodRepository.findOne({
      where: { user: context.user, id: data.id },
    });

    if (!mood) {
      throw new Error("Mood not found");
    }

    const tags = await this.tagRepository.find({
      where: { name: In(data.tags.map(tag => tag.name)), user: context.user },
    });

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

    mood.user = context.user;
    mood.emotion = data.emotion;
    mood.description = data.description;

    return this.moodRepository.save(mood);
  }
}
