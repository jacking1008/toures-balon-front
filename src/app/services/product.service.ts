import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) {
  }

  search(queryParam: string): Observable<Product[]> {
    //const path = `${environment.url}/espectaculo`;
    const path = `assets/products.json`;
    return  this.http.get<Product[]>(path);
  }

}
