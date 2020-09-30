import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shop } from '../models/shop';
import { Pay } from '../models/pay';
import { Bill } from '../models/bill';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(
    private http: HttpClient,
  ) {
  }

  pagar(pay:Pay): Observable<Bill> {
    const path = `${environment.url}/pago`;
    return  this.http.post<Bill>(path,pay);
  }

}
