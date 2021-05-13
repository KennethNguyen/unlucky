/* Interface for login/signup form */
export interface IAuthForm {
  username: string;
  password: string;
}

/* Interface for demo user credentials */
export interface IDemoUser {
  username: string | undefined;
  password: string | undefined;
}