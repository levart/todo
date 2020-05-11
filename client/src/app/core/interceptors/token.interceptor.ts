import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpBackend, HttpErrorResponse, HttpUserEvent, HttpResponse, HttpProgressEvent, HttpHeaderResponse, HttpSentEvent
} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Store} from '@ngxs/store';
import {AuthState} from '../state/auth.state';
import {catchError, filter, finalize, first, flatMap, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {Logout, RefreshToken} from '../state/auth.actions';
import {IAuth} from '../interfaces/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpBackend, private store: Store, public authService: AuthService, private router: Router) {
  }

  static addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    return this.store.select(AuthState.token).pipe(
      first(),
      flatMap(token => {
        const authReq = !!token
          ? req.clone({
            setHeaders: {Authorization: 'Bearer ' + token.accessToken}
          })
          : req;
        return next.handle(authReq);
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse> err).status) {
            case 401:
              return this.handle401Error(req, next);
            case 400:
              return throwError(`Connection Error: ${err.message}`);
          }
        }
        return throwError(`Connection Error: ${err.message}`); // return another `error`
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.store.dispatch(RefreshToken)
        .pipe(
          switchMap((user: any) => {
            if (user) {
              this.tokenSubject.next(user.auth.token.accessToken);
              return next.handle(TokenInterceptor.addTokenToRequest(request, user.auth.token.accessToken));
            }
            this.store.dispatch(Logout);
            return of(false);
          }),
          catchError(err => {
            this.store.dispatch(Logout);
            return of(false);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(TokenInterceptor.addTokenToRequest(request, token));
          }),
          catchError((err) => {
            this.store.dispatch(Logout);
            return of(false);
          }),
        );
    }
  }
}
