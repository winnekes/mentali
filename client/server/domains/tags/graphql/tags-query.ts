import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { ServerContext } from "../../../context";
import { Tag } from "../entities/tag-entity";
import { TagType } from "./tag-type";

@Resolver()
export class TagsQuery {
  private tagRepository = getRepository("Tag") as Repository<Tag>;

  @Authorized()
  @Query(returns => [TagType])
  tags(@Ctx() context: ServerContext): Promise<TagType[] | undefined> {
    return this.tagRepository.find({
      where: { user: context.user },
    });
  }
}
