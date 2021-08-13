import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Emotion } from "../entities/mood-entity";

registerEnumType(Emotion, { name: "Emotion" });

@ObjectType()
export class MoodType {
  @Field((type) => Int)
  id!: number;

  @Field((returns) => Emotion)
  emotion!: Emotion;

  @Field()
  date!: Date;

  @Field()
  description!: string;

  @Field()
  createdAt!: Date;
}
