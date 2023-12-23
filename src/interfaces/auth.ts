export interface ILogin {
  email: string;
  password: string;
}

export interface IOTPValidation {
  otp: string;
  userId: string | null;
}
