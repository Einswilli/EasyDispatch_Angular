import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  
  private baseUrl = environment.apiUrl;
  token :string="";

  constructor(private http: HttpClient) {
    
   }
  

  getCommande(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCommande(commande: Object): Observable<Object> {
    console.log("token ", );
    return this.http.post(`${this.baseUrl+'/commande'}`, commande);
  }
 

  updateCommande(id: number, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + '/commande/'+id, value);
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/commande/'+id, { responseType: 'text' });
  }

  getCommandeList(): Observable<any> {
    return this.http.get(`${this.baseUrl+'/commande'}`);
  }
}
