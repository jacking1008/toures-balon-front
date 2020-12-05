import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { RtaSolr } from '../models/rta-solr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) {
  }

  search(queryParam: string): Observable<RtaSolr> {
    //const path = `${environment.url}/espectaculo`;
    const path = `http://706d77741412.ngrok.io/products?q=${queryParam}`;
    //const path = `assets/products.json`;
    return this.http.get<RtaSolr>(path);
  }

}
