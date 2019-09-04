import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('CanActivate Guard is called');
      const { url } = state;
      return this.checkLogin(url);
    }
  
    canActivateChild(
      next: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      console.log('CanActivateChild Guard is called');
      const { url } = state;
      return this.checkLogin(url);
    }

    canLoad(route, segments): Observable<boolean> | Promise<boolean> | boolean {
      console.log('CanLoad Guard is called');
      const url = `/${route.path}`;
      return <boolean>this.checkLogin(url);
  }
  
  private checkLogin(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    const sessionId = 123456789;

    const navigationExtras: NavigationExtras = {
      queryParams: { sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page, return UrlTree
    //return this.router.parseUrl('/login');
    this.router.navigate(['/login'], navigationExtras);
    return false;

  }

}
