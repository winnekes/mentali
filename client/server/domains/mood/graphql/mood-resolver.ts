import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { getRepository, In, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { Tag } from "../../tags/entities/tag-entity";
import { TagType } from "../../tags/graphql/tag-type";
import { Mood } from "../entities/mood-entity";
import { MoodType } from "./mood-type";

@Resolver(of => MoodType)
export class MoodResolver {
  private tagRepository = getRepository("Tag") as Repository<Tag>;

  @FieldResolver(type => [TagType], { nullable: true })
  async tags(@Root() mood: Mood, @Ctx() context: ServerContext) {
    return this.tagRepository
      .createQueryBuilder("tag")
      .innerJoin("tag.moods", "mood", "mood.id = :moodId", { moodId: mood.id })
      .getMany();
  }
}
