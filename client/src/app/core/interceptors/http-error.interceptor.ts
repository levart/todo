import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notification: NotificationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error

            if (error.status === 401) {
              return throwError(error);
            }

            errorMessage = `${error.error.message || error.error.error || error.error.errorMessage}`;
          }

          if (error.status >= 400 && error.status < 500 && error.status !== 401) {
            this.notification.warning(
              errorMessage,
              'შეტყობინება'
            );
          }

          if (error.status >= 500) {
            this.notification.warning(
              errorMessage,
              'შეცდომა'
            );
          }


          return throwError(error);

        })
      );
  }
}
