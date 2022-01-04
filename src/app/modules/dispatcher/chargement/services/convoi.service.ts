import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConvoiService {

  private baseUrl = environment.apiUrl;
  token :string=""

  constructor(private http: HttpClient) {
    
   }
  

  getConvoi(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createConvoi(convoi: Object): Observable<Object> {
    console.log("token ", )
    return this.http.post(`${this.baseUrl+'/convoi'}`, convoi);
  }
 

  updateConvoi(id: number, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + '/convoi/'+id, value);
  }

  deleteConvoi(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/convoi/'+id, { responseType: 'text' });
  }

  getConvoiList(): Observable<any> {
    return this.http.get(`${this.baseUrl+'/convoi'}`);
  }

  
}
