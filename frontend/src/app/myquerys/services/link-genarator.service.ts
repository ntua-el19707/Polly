import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkGenaratorService {
  private url  = environment.urladmin + '/GenarateSessionLinks';
  constructor(private http:HttpClient ) { }
  genarate(poll_id,total):Observable<any>{
    return this.http.post(`${this.url}/${poll_id}/${total}`,{});
  }
}
