import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { Mood } from "../entities/mood-entity";
import { MoodType } from "./mood-type";

@Resolver()
export class MoodsQuery {
  private moodRepository = getRepository("Mood") as Repository<Mood>;

  @Authorized()
  @Query(returns => [MoodType])
  async moods(@Ctx() context: ServerContext): Promise<Mood[]> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }

    return this.moodRepository.find({
      relations: ["user", "tags"],
      where: { user: { authId: context.authId } },
    });
  }
}
