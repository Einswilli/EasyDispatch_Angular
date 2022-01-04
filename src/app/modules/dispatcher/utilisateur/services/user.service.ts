import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = environment.apiUrl;
  token :string=""

  constructor(private http: HttpClient) {
    
   }
  

  // getUser(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }

  createUser(localisation: Object): Observable<Object> {
    console.log("token ", )
    return this.http.post(`${this.baseUrl+'/user'}`, localisation);
  }

  // updateLocalisation(id: number, value: any): Observable<Object> {
  //   return this.http.put(this.baseUrl + '/localisation/'+id, value);
  // }

  // deleteLocalisation(id: number): Observable<any> {
  //   return this.http.delete(this.baseUrl + '/localisation/'+id, { responseType: 'text' });
  // }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl+'/users'}`);
  }
}
