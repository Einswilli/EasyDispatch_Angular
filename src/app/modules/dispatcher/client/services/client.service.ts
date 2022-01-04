import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthenticationService } from '@modules/auth/services/authentication.service';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.apiUrl;
  token :string=""

  constructor(private http: HttpClient) {
    
   }
  

  getClient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createClient(client: Object): Observable<Object> {
    console.log("token ", )
    return this.http.post(`${this.baseUrl+'/client'}`, client);
  }
 

  updateClient(id: number, value: any): Observable<Object> {
    return this.http.put(this.baseUrl+ '/client/'+id, value);
  }

  deleteClient(id: number): Observable<any> {
    alert(`${this.baseUrl}/client/${id}`);
    return this.http.delete(`${this.baseUrl}/client/${id}`, {responseType: 'text' });
  }

  getClientsList(): Observable<any> {
    return this.http.get(`${this.baseUrl+'/client'}`);
  }

  getClientPayerList(clientType :string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${clientType}`);
  }
  
  getClientByType(clientType:string): Observable<any> {
    return this.http.get(`${this.baseUrl+'/client/type/'}/${clientType}`);
  }
}
