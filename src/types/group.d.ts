import { IUser } from "./user";

interface Group {
  _id: string;
  admin: IUser;
  name: string;
  description: string;
  secretCode: string;
  feePerHour: string;
  members: IUser[];
  groupImage?: string;
}
