import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Login } from './login';
import { JwtToken } from './jwt-token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getJwtToken(login: Login) : Observable<JwtToken>{
    return this.http.post<JwtToken>("/authenticate", login);
  }
}
