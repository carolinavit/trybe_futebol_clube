export interface IUser {
  email: string;
  password: string;
}

export interface IToken {
  email: string;
  iat: number;
  exp: number;
}

export interface IUserService {
  signin(email: string, password: string): Promise<string>;
  getRole(email: string): Promise<string | undefined>;
}
