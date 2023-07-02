import { ValidateNested } from "class-validator";
import GraphQLJSON from "graphql-type-json";
import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { User, UserSettings } from "../entities/user-entity";
import { UserType } from "./user-type";

@InputType()
export class UpdateUserSettingsInputType {
  @Field()
  nickname!: string;

  @Field(() => GraphQLJSON)
  settings!: UserSettings;
}

@Resolver()
export class UpdateUserProfileMutation {
  private userRepository = getRepository("User") as Repository<User>;

  @Authorized()
  @Mutation(returns => UserType)
  async updateUserProfile(
    @Arg("data") data: UpdateUserSettingsInputType,
    @Ctx() context: ServerContext
  ): Promise<User | undefined> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }

    try {
      context.user.nickname = data.nickname;
      context.user.settings = data.settings;

      await this.userRepository.save(context.user);
    } catch (e) {
      console.log(e);
    }
    return context.user;
  }
}
