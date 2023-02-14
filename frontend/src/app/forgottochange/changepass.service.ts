import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangepassService {
  private url  = environment.urldf +'/forgot/change';
  constructor(private http:HttpClient) { }

  changepass(pass,jwt):Observable<any>{
    console.log(jwt)
    const httpOptions ={
      
        'authorization': jwt,
      
        pass1:pass,
        pass2:pass
       
    }
    console.log(httpOptions)

return this.http.post(this.url,httpOptions);
  }
}
