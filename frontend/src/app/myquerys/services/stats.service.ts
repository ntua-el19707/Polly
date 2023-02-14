import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private url = environment.urladmin + '/getStats';
  private urlmail = environment.urladmin + '/requestExcel';
  constructor(private http:HttpClient) {
    
   
  }
  
  getStats(poll_id):Observable<any>{
    return this.http.get(`${this.url}/${poll_id}`);
  }
  getmail(json):Observable<any>{
    const body = {
      statsq:json
    }
    return this.http.post(this.urlmail,body)//why? i want to send things in body 
  }
}
