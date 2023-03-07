/* eslint-disable prettier/prettier */
import { Member } from "src/schema/member.schema";

/* eslint-disable prettier/prettier */
export class Project {
  projectName: string;
  status: string;
  openDate: Date;
  endDate: Date;
  members: Member;
  projectManager: Member;
}
