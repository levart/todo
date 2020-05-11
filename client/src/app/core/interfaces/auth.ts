import { IUser } from './user.model';

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuth {
  token: Token;
  user: IUser;
}

export interface Token {
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
