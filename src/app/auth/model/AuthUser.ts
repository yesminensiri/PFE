import { Role } from "./role";
export interface AuthUser {
    id: string;
    email: string;
    roles: Role[];
  }
  