import { Field, Int, ObjectType } from "type-graphql";
import { Emotion } from "../../mood/entities/mood-entity";

@ObjectType()
export class MoodCountType {
  @Field(type => Emotion)
  emotion!: Emotion;

  @Field(type => Int)
  count!: number;
}

@ObjectType()
export class TagCountType {
  @Field()
  tag!: string;

  @Field(type => Int)
  count!: number;
}

@ObjectType()
export class StatisticsType {
  @Field(type => [MoodCountType])
  moodCounts!: MoodCountType[];

  @Field(type => [TagCountType])
  tagUsageCounts!: TagCountType[];
}
