import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidforgotService } from './service/validforgot.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ForgotGuardGuard implements CanActivate {
 constructor(private forgotService:ValidforgotService){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       
  //    console.log(route.params)
    //  let response = false; 
     
      return 	this.forgotService.valid(route.params?.['tokkenLink']).pipe(map(r =>{
//		console.log(r);
		if(r.msg === 'valid'){
		return true;
		}else{
		return false;}
	}))
      
  
   

      
  }
  
}
