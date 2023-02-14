import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class BuilderGuardGuard implements CanActivate, CanActivateChild, CanLoad, CanMatch {
  private authentcated():boolean{
    if(localStorage.getItem('token')){
      return true
    }else{
      return false;
    }
  }
  constructor(private auth:LoginService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //console.log(route)
      if(this.authentcated()){
        return true
      }
      return this.router.createUrlTree(['/login']);
      
      
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authentcated();
  }
 
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authentcated();
  }canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      return this.authentcated();
  }
}
