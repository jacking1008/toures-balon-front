import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getById(idClient: string, token: string): Observable<Client> {
    //const path = `${environment.url}/espectaculo`;
    const path = `http://localhost:38723/api/Client/${idClient}`;
    return  this.http.get<Client>(path,{
      headers: new HttpHeaders()
        .set('Authorization',  `${token}`)
    });
  }

  create(client: Client, user: User): Observable<Auth> {
    debugger
    //const path = `${environment.url}/espectaculo`;
    const path = `http://localhost:38723/api/Client`;
    return  this.http.post<Auth>(path,{
      client: client,
      user: user
    });
  }

}
