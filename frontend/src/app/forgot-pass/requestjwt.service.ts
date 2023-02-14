import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestjwtService {
  private url  = environment.urldf + '/forgot' ; 
  private  urlChangeRequest = environment.urladmin + '/requestgangePass'
  constructor(private http:HttpClient) { }
  requestChangePass( user:string):Observable<any>{
    const body = {
      user:user
    } 
    return this.http.post(this.url,body);
  }
  requestChangePassUserAuthed(pass:String){
    console.log(pass)
    return this.http.get(`${this.urlChangeRequest}/${pass}`);
  }
}
