import { IUser } from "./i-user";

export interface IQuotation {
  id: number;
  nameUser: string;
  surnameUser: string;
  eventDetails: string;
  city: string;
  requestDate: string;
  status: string;
}
