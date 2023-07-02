import { IsNotEmpty } from "class-validator";
import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { oauth2Client } from "../../../utils/fitness-client";
import { User } from "../entities/user-entity";
import { UserType } from "./user-type";

@InputType()
export class SaveRefreshTokenInputType {
  @IsNotEmpty()
  @Field()
  authToken!: string;
}

@Resolver()
export class SaveRefreshTokenMutation {
  private userRepository = getRepository("User") as Repository<User>;

  @Authorized()
  @Mutation(returns => UserType)
  async saveRefreshToken(
    @Arg("data") data: SaveRefreshTokenInputType,
    @Ctx() context: ServerContext
  ): Promise<User | undefined> {
    if (!context.authId || !context.user) {
      throw new Error("No user set on context");
    }

    try {
      const { tokens } = await oauth2Client.getToken(data.authToken);

      context.user.refreshToken = tokens.refresh_token ?? "";

      await this.userRepository.save(context.user);
    } catch (e) {
      console.log(e);
    }
    return context.user;
  }
}
