import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { Emotion, Mood } from "../../mood/entities/mood-entity";
import { Tag } from "../../tags/entities/tag-entity";
import { StatisticsType } from "./statistics-type";

type EmotionKey = keyof typeof Emotion;

@Resolver()
export class StatisticsQuery {
  private moodRepository = getRepository("Mood") as Repository<Mood>;
  private tagRepository = getRepository("Tag") as Repository<Tag>;

  @Authorized()
  @Query(returns => StatisticsType)
  async statistics(@Ctx() context: ServerContext): Promise<StatisticsType> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }

    const moods = await this.moodRepository.find({
      where: { user: context.user },
      relations: ["tags"],
    });
    const tags = await this.tagRepository.find({
      where: { user: context.user },
    });

    const emotionKeys = Object.keys(Emotion).map(key => key) as Emotion[];

    const moodCounts = moods.reduce((allMoods, currentMood) => {
      const existingMood = allMoods.find(mood => mood.emotion === currentMood.emotion);
      if (existingMood) {
        existingMood.count++;
      } else allMoods.push({ emotion: currentMood.emotion as Emotion, count: 1 });
      return allMoods;
    }, [] as Array<{ emotion: Emotion; count: number }>);

    const tagUsageCounts = tags.map(tag => ({ tag: tag.name, count: 0 }));

    for (const key of emotionKeys) {
      if (!moodCounts.find(mood => mood.emotion === key)) {
        moodCounts.push({ emotion: key, count: 0 });
      }
    }

    moods.map(mood =>
      mood.tags.map(tag => {
        const tagCount = tagUsageCounts.find(tagCount => tagCount.tag === tag.name);
        tagCount && tagCount.count++;
        return tag;
      })
    );

    moodCounts.sort((a, b) => (a.count === b.count ? 0 : a.count > b.count ? -1 : 1));
    tagUsageCounts.sort((a, b) => (a.count === b.count ? 0 : a.count > b.count ? -1 : 1));
    console.log({ moodCounts, tagUsageCounts });
    return { moodCounts, tagUsageCounts };
  }
}
