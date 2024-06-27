import { IBarman } from "./i-barman";
import { IUser } from "./i-user";

export interface IUserResponse {
  token: string;
  user: IUser | IBarman;
}
