import {IAuth, ILogin, IRegister} from '../interfaces/auth';


export class Login {
  static readonly type = '[AUTH] Login user';

  constructor(public payload: ILogin) {
  }
}

export class RefreshToken {
  static readonly type = '[AUTH] refresh token user';

  constructor(public payload: any) {
  }
}

export class Auth {
  static readonly type = '[AUTH] Auth user';

  constructor(public payload: IAuth) {
  }
}

export class Logout {
  static type = '[Auth] Logout';
}

export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess';
}

// Events
export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess';

  constructor(public user: any) {
  }
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';

  constructor(public error: any) {
  }
}


export class Register {
  static readonly type = '[AUTH] Register user';

  constructor(public payload: IRegister) {
  }
}
