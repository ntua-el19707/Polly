import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private url  = environment.urldf+'/login';
  constructor(private http:HttpClient,private cookieService:CookieService) { }
  login(user:Login):Observable<any>{
    const json ={
       Login:{
        user:user.user,
        pass:user.pass}
    }
    return this.http.post(this.url,json);
  } 
  authenticate(){
    let auth = this.cookieService.get('Authorization');
    console.log(auth)
  }
  setLocalStorage(responseobj){
    const expires = moment().add('1d');
    localStorage.setItem('token',responseobj.token);
    localStorage.setItem('expires',JSON.stringify(expires.valueOf()));


  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    console.log('done')
  }
  isLoggedIn(){
      return moment().isBefore(this.getExpiration())
  }
  isLoggedOut(){
    return !this.isLoggedIn();
  }
  getExpiration(){
    const expiration  = localStorage.getItem('expires');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }



}
