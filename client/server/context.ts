import { User } from "./domains/user/entities/user-entity";

export interface ServerContext {
  authId?: string;
  user?: User;
}
