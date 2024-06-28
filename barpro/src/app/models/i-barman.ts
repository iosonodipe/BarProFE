import { IUser } from "./i-user";

export interface IBarman extends IUser{
  experienceYears: number;
  description: string;
  rating: number;
}
