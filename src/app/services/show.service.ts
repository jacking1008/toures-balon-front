import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {


  constructor(
    private http: HttpClient,
  ) {
  }

  cargarData(): Observable<Show[]> {
    const path = `assets/events.json`;
    return  this.http.get<Show[]>(path);
  }
}
