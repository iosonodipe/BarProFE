import { IBarman } from "./i-barman";
import { IUser } from "./i-user";

export interface IBooking {
  id: number;
  user: IUser;
  barman: IBarman;
  eventDetails: string;
  city: string;
  date: string;
  status: string;
}
