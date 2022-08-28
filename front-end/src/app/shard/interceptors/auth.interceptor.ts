import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../servicrs/user.service';

@Injectable({ providedIn: 'root' })
// tslint:disable-next-line:class-name
export class authInterceptor implements HttpInterceptor {
  constructor(private auth: UserService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    if (token) {
      console.log('done');

      const cloned = req.clone({
        headers: req.headers.set('Authentication', `${token}`),
      });
      return next.handle(cloned);

    }
    return next.handle(req);
  }
}
