import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Questionaire } from './questionaire';

@Injectable({
  providedIn: 'root'
})
export class FetchquestionareiService {
  private url= environment.urldf + '/questionnaire';
  constructor(private http:HttpClient ) { }
  fetch(id:number):Observable<any>{
    return this.http.get<any>(this.url + `/${id}`);
  }
  fetc2(poll_id,session){
    console.log(`${this.url}/${session}/${poll_id}`)
    return this.http.get<any>(`${this.url}/${session}/${poll_id}`);
  }
}
