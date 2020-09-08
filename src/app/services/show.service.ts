import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../models/show';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {


  constructor(
    private http: HttpClient,
  ) {
  }

  cargarData(): Observable<Show[]> {
    const path = `${environment.url}/espectaculo`;
    return  this.http.get<Show[]>(path);
  }

  cargarById(id: number): Observable<any> {
    const path = `${environment.url}/espectaculo/${id}`;
    return  this.http.get<Show[]>(path);
  }
}
