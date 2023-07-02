import { Field, FieldResolver, Int, ObjectType, registerEnumType } from "type-graphql";
import { TagType } from "../../tags/graphql/tag-type";
import { Emotion } from "../entities/mood-entity";

registerEnumType(Emotion, { name: "Emotion" });

@ObjectType()
export class MoodType {
  @Field(type => Int)
  id!: number;

  @Field(returns => Emotion)
  emotion!: Emotion;

  @Field()
  date!: Date;

  @Field()
  description!: string;

  @Field(type => [TagType], { nullable: true })
  tags!: TagType[];

  @Field()
  createdAt!: Date;
}
