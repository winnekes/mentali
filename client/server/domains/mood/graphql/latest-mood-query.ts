import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { Mood } from "../entities/mood-entity";
import { MoodType } from "./mood-type";

@Resolver()
export class LatestMoodQuery {
  private moodRepository = getRepository("Mood") as Repository<Mood>;

  @Authorized()
  @Query(returns => MoodType, { nullable: true })
  async latestMood(@Ctx() context: ServerContext): Promise<Mood | undefined> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }

    return this.moodRepository.findOne({
      relations: ["user", "tags"],
      where: { user: { authId: context.authId } },
      order: { date: "DESC" },
    });
  }
}
