import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Auth } from '../models/auth';
import { Client } from '../models/client';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
  ) {
  }

  create(client: Client, user: User): Observable<Auth> {
    //const path = `${environment.url}/espectaculo`;
    const path = `https://localhost:38723/api/Client`;
    return  this.http.post<Auth>(path,{
      client: client,
      user: user
    });
  }

}
