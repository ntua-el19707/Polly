import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Info } from './info';

@Injectable({
  providedIn: 'root'
})
export class MyinfoService {

  constructor(private http:HttpClient) {

   }
   private urt = environment.urladmin + '/myInfo'
   getmyinfo():Observable<any>{
    return this.http.get(this.urt)
   }
   putinfo(fullName,username):Observable<any>{
    const json ={
      fullName:fullName,
      username:username
    }
    return this.http.put(this.urt,json)
   }
}
