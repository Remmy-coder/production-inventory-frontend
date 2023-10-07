export interface IUserRegistration {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    confirmPassword?: string;
}