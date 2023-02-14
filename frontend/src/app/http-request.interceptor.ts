import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const idtoken = localStorage.getItem('token')
    if(idtoken){
     // console.log(idtoken)
      const clone = request.clone({
        headers:request.headers.set("Authorization", idtoken)
      })
      return next.handle(clone);
    }
    return next.handle(request);
  }
}
