import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiterneService {
  
  private baseUrl = environment.apiUrl;
  token :string=""

  constructor(private http: HttpClient) {
    
   }
  

  getCiterne(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCiterne(citerne: Object): Observable<Object> {
    console.log("token ", )
    return this.http.post(`${this.baseUrl+'/citerne'}`, citerne);
  }
 

  updateCiterne(id: number, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + '/citerne/'+id, value);
  }

  deleteCiterne(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/deleteCiterne/'+id, { responseType: 'text' });
  }

  getCiterneList(): Observable<any> {
    return this.http.get(`${this.baseUrl+'/citerne'}`);
  }
}
