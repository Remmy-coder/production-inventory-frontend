import { ICompanyObject } from "./company";

export interface IUserRegistration {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyId?: string | null;
}

export interface IUserObject {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  otpSecret: string | null;
  otpToken: string | null;
  otpGeneratedAt: string | null;
  isVerified: string;
  verificationToken: string | null;
  company: ICompanyObject;
  [key: string]: any;
}
