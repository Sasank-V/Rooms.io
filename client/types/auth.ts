import { userRoleEnum } from '../database/schema';

export type UserRole = (typeof userRoleEnum)[number];

export interface SignUpData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  aadharNumber: string;
  role: UserRole;
  password: string;
}

export interface LoginData {
  phone: string;
  password: string;
}
