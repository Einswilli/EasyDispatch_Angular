import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthenticationService } from '@modules/auth/services/authentication.service';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CamionService {
  private baseUrl =  environment.apiUrl;
  token :string=""
  
  constructor(private http: HttpClient) {
    
   }
  

  getCamion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCamion(camion: Object): Observable<Object> {
    console.log("token ", )
    return this.http.post(`${this.baseUrl+'/camion'}`, camion);
  }
 

  updateCamion(id: number, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + '/camion/'+id, value);
  }

  deleteCamion(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/camion/'+id, { responseType: 'text' });
  }

  getCamionList(): Observable<any> {
    return this.http.get(`${this.baseUrl+'/camion'}`);
  } 
 
}
