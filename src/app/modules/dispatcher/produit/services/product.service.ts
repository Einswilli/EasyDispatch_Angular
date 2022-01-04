import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import {ProduitModel} from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;
  token = '';

  constructor(private http: HttpClient) {

   }


  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProduct(produit: ProduitModel): Observable<any> {
    console.log('token ', );
    return this.http.post(`${this.baseUrl + '/produit'}`, produit);
  }


  updateProduct(id: number, value: any): Observable<Object> {
    return this.http.put(this.baseUrl + '/produit/' + id, value);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/deleteProduit/' + id, { responseType: 'text' });
  }

  getProductList(): Observable<any> {
    return this.http.get(`${this.baseUrl + '/produit'}`);
  }
}
