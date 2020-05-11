import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, concatMap} from 'rxjs/operators';
import {isArray} from 'util';
import {environment} from '../../../../environments/environment';
import {IApiResponse} from '../../interfaces/api-response.model';

@Injectable()
export class HttpWrapper {
  private get baseUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) {
  }

  public get<T>(url: string, parameters?: any): Observable<any> {
    const options = {
      params: this.getHttpParams(parameters)
    };
    return this.http.get<IApiResponse<T>>(`${this.baseUrl}${url}`, options).pipe(
      concatMap(res => {
        return of(res);
      }),
      catchError((err) => throwError(err))
    );
  }

  public post<T>(url: string, options?: any): Observable<any> {
    return this.http.post<T>(`${this.baseUrl}${url}`, options, {observe: 'response'}).pipe(
      concatMap(res => {
        if (res.ok) {
          if (!res.body && res.status === 200) {
            return of(true);
          }
          return of(res.body);
        } else {
          throw res.body;
        }
      }),
      catchError((err) => throwError(err))
    );
  }

  public put<T>(url: string, options?: any): Observable<any> {
    return this.http.put<T>(`${this.baseUrl}${url}`, options, {observe: 'response'}).pipe(
      concatMap(res => {
        if (res.ok) {
          if (!res.body && res.status === 200) {
            return of(true);
          }
          return of(res.body);
        } else {
          throw res.body;
        }
      }),
      catchError((err) => throwError(err))
    );
  }

  public delete<T>(url: string, options?: any): Observable<any> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, {observe: 'response'}).pipe(
      concatMap(res => {
        if (res.ok) {
          if (!res.body && res.status === 200) {
            return of(true);
          }
          return of(res.body);
        } else {
          throw res.body;
        }
      }),
      catchError((err) => throwError(err))
    );
  }

  private getHttpParams(parameters) {
    let httpParams = new HttpParams();

    function encodeValue(value) {
      if (value && value.toString() === '[object Object]') {
        return JSON.stringify(value);
      } else {
        return value;
      }
    }

    for (const key in parameters) {
      if (!parameters.hasOwnProperty(key)) {
        continue;
      }
      const val = parameters[key];

      if (isArray(val)) {
        val.forEach(element => {
          httpParams = httpParams.append(key, encodeValue(element));
        });
      } else {
        httpParams = httpParams.append(key, encodeValue(val));
      }
    }
    return httpParams;
  }

}
