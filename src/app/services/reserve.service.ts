import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserve } from '../models/reserve';
import { ReserveResponse } from '../models/reserve-response';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(
    private http: HttpClient,
  ) {
  }

  reserve(request: Reserve): Observable<ReserveResponse> {
    //const path = `${environment.url}/espectaculo`;
    //const path = `assets/reserve.json`;
    debugger
    const path = `http://cf35b7d42d86.ngrok.io/api/v1/reserva/`
    //return  this.http.get<ReserveResponse>(path);
    return  this.http.post<ReserveResponse>(path,request);
  }
}
