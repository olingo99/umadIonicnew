import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';
import { baseUrl } from './constants';


@Injectable({
  providedIn: 'root'
})
export class HTTPInterceptorService implements HttpInterceptor{

  ignoredUrls = [
    {url: '/login', method: 'POST'},
    {url: '/user/name/', method: 'GET'},
    {url: '/user', method: 'POST'},
  ]

  constructor(
    private authTokenService: AuthTokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.url.includes('login') || (req.url.includes('user') && req.method == 'POST')) {
    //   return next.handle(req);
    // }
    console.warn("intercept");
    // console.log(req.url);
    // console.log(this.authTokenService.getToken());
    const shouldIgnore = this.ignoredUrls.some(
      // ignored => req.url.includes(ignored.url) && req.method === ignored.method
      ignored => req.url === baseUrl+ignored.url && req.method === ignored.method
    );

    if (shouldIgnore) {
      // console.log("shouldIgnore");
      return next.handle(req);
    }

    let header = new HttpHeaders().set('Authorization',this.authTokenService.getToken());
    let newReq = req.clone({headers: header});
    return next.handle(newReq);
  }

}
