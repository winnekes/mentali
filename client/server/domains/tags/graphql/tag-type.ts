import { Field, InputType, Int, ObjectType } from "type-graphql";

@InputType()
export class TagInputType {
  @Field()
  name!: string;
}

@ObjectType()
export class TagType {
  @Field(type => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  createdAt!: Date;
}
