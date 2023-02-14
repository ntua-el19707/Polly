import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http:HttpClient) { }
  private url  = environment.urldf +'/fill';
  submit(stats,poll_id,session_id):Observable<any>{
    const body = {stats:stats}
    return this.http.post(`${this.url}/${poll_id}/${session_id}`,body)


  }
}
