import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../../auth/Auth.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authObject = this.authenticationService.authObject;
    const isAuthUrl = this.checkUrlToAuth(request.url);
    if (authObject && isAuthUrl) {
      const token = btoa(unescape(encodeURIComponent(authObject.user + ':' + authObject.password)));
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${token}`
        }
      });
    }

    return next.handle(request);
  }

  checkUrlToAuth(url: string) {
    for (const urlKey in environment.urls) {
      if (url.indexOf(environment.urls[urlKey].url) !== -1 && environment.urls[urlKey].auth) {
        return true;
      }
    }
    return false;
  }
}
