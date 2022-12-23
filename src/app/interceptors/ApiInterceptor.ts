import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jwtToken: string | null = window.localStorage.getItem('jwtToken');

    const request = req.clone({
      url: `http://localhost:8080/api${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      }
    });

    return next.handle(request);
  }
}