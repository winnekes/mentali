import { GraphQLBoolean } from "graphql";
import { Arg, Authorized, Ctx, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { Mood } from "../entities/mood-entity";

@InputType()
class DeleteMoodInputType {
  @Field(type => Int)
  id!: number;
}

@Resolver()
export class DeleteMoodMutation {
  private moodRepository = getRepository("Mood") as Repository<Mood>;

  @Authorized()
  @Mutation(returns => GraphQLBoolean)
  async deleteMood(
    @Arg("data") data: DeleteMoodInputType,
    @Ctx() context: ServerContext
  ): Promise<boolean> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }

    const mood = await this.moodRepository.findOne({
      where: { user: context.user, id: data.id },
    });

    if (!mood) {
      throw new Error("Mood not found");
    }

    await this.moodRepository.delete(mood.id);
    return true;
  }
}
