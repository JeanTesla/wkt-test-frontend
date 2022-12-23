import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let jwtToken: string | null = window.localStorage.getItem('jwtToken');

    if (jwtToken !== '' && jwtToken !== null && jwtToken !== undefined) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}
