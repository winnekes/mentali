import { getSession } from "@auth0/nextjs-auth0";
import { ApolloServer } from "apollo-server-micro";
import { IncomingMessage, ServerResponse } from "http";
import { AuthChecker, buildSchema, NonEmptyArray } from "type-graphql";
import { FitnessQuery } from "./domains/fitness/graphql/fitness-query";
import { DeleteMoodMutation } from "./domains/mood/graphql/delete-mood-mutation";
import { EditMoodMutation } from "./domains/mood/graphql/edit-mood-mutation";
import { AddMoodMutation } from "./domains/mood/graphql/add-mood-mutation";
import { LatestMoodQuery } from "./domains/mood/graphql/latest-mood-query";
import { MoodQuery } from "./domains/mood/graphql/mood-query";
import { MoodResolver } from "./domains/mood/graphql/mood-resolver";
import { MoodsQuery } from "./domains/mood/graphql/moods-query";
import { StatisticsQuery } from "./domains/statistics/graphql/statistics-query";
import { TagsQuery } from "./domains/tags/graphql/tags-query";
import { ProfileQuery } from "./domains/user/graphql/profile-query";
import { SaveRefreshTokenMutation } from "./domains/user/graphql/save-refresh-token-mutation";
import { UpdateUserProfileMutation } from "./domains/user/graphql/update-user-profile-mutation";
import { getUser } from "./utils/get-user";
import { ServerContext } from "./context";

export const startGraphqlServer = async (req: IncomingMessage, res: ServerResponse) => {
  const queries: NonEmptyArray<Function> = [
    FitnessQuery,
    LatestMoodQuery,
    MoodsQuery,
    MoodQuery,
    ProfileQuery,
    StatisticsQuery,
    TagsQuery,
    // MoodResolver,
  ];
  const mutations: NonEmptyArray<Function> = [
    AddMoodMutation,
    EditMoodMutation,
    DeleteMoodMutation,
    SaveRefreshTokenMutation,
    UpdateUserProfileMutation,
  ];

  const authId: string = getSession(req, res)?.user.sub;
  const user = authId && (await getUser(authId));

  const authChecker: AuthChecker<ServerContext> = ({ context }) => {
    return !!context.user;
  };

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      authChecker,
      resolvers: [...queries, ...mutations],
    }),
    context: { authId, user },
  });

  await apolloServer.start();
  return apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};
