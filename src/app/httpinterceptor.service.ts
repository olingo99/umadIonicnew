import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';
import { baseUrl } from './constants';

/*
Intercept all the http requests and add the token to the header
*/


@Injectable({
  providedIn: 'root'
})
export class HTTPInterceptorService implements HttpInterceptor{

  ignoredUrls = [                                 //Urls that don't need the token
    {url: '/login', method: 'POST'},
    {url: '/user/name/', method: 'GET'},
    {url: '/user', method: 'POST'},
  ]

  constructor(
    private authTokenService: AuthTokenService
  ) { }


  //Add the token to the header of the request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //ignore the urls in the ignoredUrls array
    const shouldIgnore = this.ignoredUrls.some(
      ignored => req.url === baseUrl+ignored.url && req.method === ignored.method
    );

    if (shouldIgnore) {
      return next.handle(req);
    }

    //add the token to the header
    let header = new HttpHeaders().set('Authorization',this.authTokenService.getToken());   //get the token from the service and add it to the header
    let newReq = req.clone({headers: header});
    return next.handle(newReq);
  }

}
