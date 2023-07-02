import { Session } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getRepository, Repository } from "typeorm";
import { initializeDatabase } from "../database-connection";
import { User } from "../domains/user/entities/user-entity";

export const afterCallback = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  await initializeDatabase();
  const userRepository = getRepository("User") as Repository<User>;
  const userFound = await userRepository.findOne({
    where: { authId: session.user?.sub },
  });
  const user = userFound || userRepository.create();

  if (!userFound) {
    user.authId = session.user.sub ?? "";
    user.email = session.user.email ?? "";
    user.nickname = session.user.given_name ?? "";
  }
  user.pictureUrl = session.user.picture ?? "";
  user.lastLogin = session.user.last_login ?? new Date();

  await userRepository.save(user);

  return session;
};
