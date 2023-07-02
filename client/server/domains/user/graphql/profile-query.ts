import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { User } from "../entities/user-entity";
import { UserType } from "./user-type";

@Resolver()
export class ProfileQuery {
  private userRepository = getRepository("User") as Repository<User>;

  @Query(returns => UserType)
  profile(@Ctx() context: ServerContext): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { authId: context.authId },
    });
  }
}
