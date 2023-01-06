import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  pathsApplyingRequisitionFilter: string[] = ["/authenticate"]

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const request = req.clone({
      url: `http://localhost:8080/api${req.url}`,
      setHeaders: this.headerDefinitionLogic(req.url)
    });
    return next.handle(request);
  }

  headerDefinitionLogic(url: string) : any {
    if(this.pathsApplyingRequisitionFilter.includes(url)){
      return undefined
    }

    let jwtToken: string | null = window.localStorage.getItem('jwtToken');

    return {
      Authorization: `Bearer ${jwtToken}`
    }
  }
}