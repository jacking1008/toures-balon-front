import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
