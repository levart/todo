import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAuth, ILogin, IRegister} from '../../interfaces/auth';
import {HttpWrapper} from '../http-wrapper/http-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpWrapper {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  register(auth: IRegister): Observable<any> {
    return super.post('auth/register', auth);
  }

  login(auth: ILogin): Observable<IAuth> {
    return super.post('auth/login', auth);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return super.post('auth/token', {refreshToken});
  }
}
