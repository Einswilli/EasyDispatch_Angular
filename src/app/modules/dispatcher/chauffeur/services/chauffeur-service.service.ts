import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthenticationService } from '@modules/auth/services/authentication.service';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  private baseUrl = environment.apiUrl;
  token :string=""

  constructor(private http: HttpClient) {
    
   }
  

  getChauffeur(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createChauffeur(chauffeur: Object): Observable<Object> {
    console.log("token ", )
    return this.http.post(`${this.baseUrl+'/chauffeur'}`, chauffeur);
  }
 

  updateChauffeur(id: number, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + "/chauffeur/"+id, value);
  }

  deleteChauffeur(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/chauffeur/"+id, { responseType: 'text' });
  }

  getChauffeurList(): Observable<any> {
    return this.http.get(`${this.baseUrl+'/chauffeur'}`);
  }

  
}
