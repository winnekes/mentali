import "reflect-metadata";
import { ConnectionOptions, createConnection, getConnection, getConnectionOptions } from "typeorm";
import { Mood } from "./domains/mood/entities/mood-entity";
import { Tag } from "./domains/tags/entities/tag-entity";
import { User } from "./domains/user/entities/user-entity";

export const initializeDatabase = async (optionOverrides: Record<string, any> = {}) => {
  try {
    return getConnection();
  } catch (e) {
    const connectionOptions = await getConnectionOptions();
    const options: ConnectionOptions = {
      ...connectionOptions,
      synchronize: true,
      logging: true,
      entities: [Mood, Tag, User],
      ...optionOverrides,
    };

    return createConnection(options);
  }
};
