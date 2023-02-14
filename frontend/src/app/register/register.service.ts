import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private mode = "Register_user";
  private url =  environment.urladmin + '/usermod';

  constructor(private http:HttpClient) { }
  Register(user:Register):Observable<any>{
       const json={
        register:user,
        mode:this.mode
       }

    return this.http.post(this.url,json);
  }

}
