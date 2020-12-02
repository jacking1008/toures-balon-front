import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
  ) {
  }

  search(clientId: string): Observable<Cart[]> {
    //const path = `${environment.url}/espectaculo`;
    const path = `https://localhost:10569/api/Cart/${clientId}`;
    return  this.http.get<Cart[]>(path);
  }

  modify(clientId: string, cart: Cart) {
    //const path = `${environment.url}/espectaculo`;
    const path = `https://localhost:10569/api/Cart`;
    return  this.http.post(path, {
      userId: clientId,
      product: cart
    });
  }

  delete(clientId: string, productId: string) {
    //const path = `${environment.url}/espectaculo`;
    const path = `https://localhost:10569/api/Cart`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userId: clientId,
        productId: productId
      },
    };
    return  this.http.delete(path,options)
  }

}
