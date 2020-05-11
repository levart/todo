import {Navigate} from '@ngxs/router-plugin';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Auth, Login, LoginRedirect, Logout, RefreshToken, Register} from './auth.actions';

import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {IAuth, Token} from '../interfaces/auth';
import {IUser} from '../interfaces/user.model';
import {Observable} from 'rxjs';

export class AuthStateModel {
  token?: Token;
  user?: IUser;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    user: null
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static getProfile(state: AuthStateModel): IUser {
    return state.user;
  }

  @Action(Login)
  login({patchState, dispatch}: StateContext<AuthStateModel>, {payload}: Login) {
    return this.authService.login(payload).pipe(
      tap((result: IAuth) => {
        patchState({
          token: result.token,
          user: result.user
        });
        dispatch(new Auth(result));
      })
    );
  }

  @Action(RefreshToken)
  refreshToken({patchState, dispatch, getState}: StateContext<AuthStateModel>, {payload}: any) {
    const refreshToken = getState().token.refreshToken;
    return this.authService.refreshToken(refreshToken).pipe(
      tap((result: IAuth) => {
        patchState({
          token: result.token,
          user: result.user
        });
      })
    );
  }

  @Action(Auth)
  auth({getState, patchState, dispatch}: StateContext<AuthStateModel>, {payload}: Auth) {
    dispatch(new Navigate(['/todo']));
  }

  @Action(Logout)
  logout({setState, dispatch}: StateContext<AuthStateModel>) {
    setState({
      token: null,
      user: null
    });
    dispatch(new LoginRedirect());
  }

  @Action(LoginRedirect)
  onLoginRedirect({setState, dispatch}: StateContext<AuthStateModel>) {
    setState({
      token: null,
      user: null
    });
    dispatch(new Navigate(['/auth']));
  }

  @Action(Register)
  register({patchState, dispatch}: StateContext<AuthStateModel>, {payload}: Register) {
    return this.authService.register(payload).pipe(
      tap((result: any) => {
        patchState({
          token: null,
          user: null
        });
        dispatch(new Navigate(['/auth']));
      })
    );
  }
}
