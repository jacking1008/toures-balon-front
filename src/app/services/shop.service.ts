import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shop } from '../models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    private http: HttpClient,
  ) {
  }

  cargarData(): Shop[] {
    let colombia = require('src/assets/shops.json');
    //const path = `assets/shops.json`;
    return colombia;
  }

}
