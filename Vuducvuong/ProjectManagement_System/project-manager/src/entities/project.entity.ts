/* eslint-disable prettier/prettier */
import { User } from "src/schema/users.schema";

/* eslint-disable prettier/prettier */
export class Project {
  projectName: string;
  status: string;
  createDate: Date;
  projectManager: User;
  members: User;
  endDate: Date;
}
