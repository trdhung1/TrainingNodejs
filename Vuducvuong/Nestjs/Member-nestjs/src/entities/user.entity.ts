/* eslint-disable prettier/prettier */
import { Role } from "src/role/role.enum";

export class User {
    username: string;
    password: string;
    fullname: string;
    roles: Role[];
  }
  