export interface IUser {
  email: string;
  password: string;
}

export interface IUserService {
  signin(email: string, password: string): Promise<string >;
}
