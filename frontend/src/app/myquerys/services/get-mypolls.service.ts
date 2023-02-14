import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetMypollsService {
  private url =  environment.urladmin + '/mypolls';
  constructor(private http:HttpClient) { }
  getPolls():Observable<any>{
    return  this.http.get(this.url);
  }
  delete(id):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
