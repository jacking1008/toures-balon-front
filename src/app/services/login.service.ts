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
export class LoginService {

  constructor(
    private http: HttpClient,
  ) {
  }

  auth(user: Login): Observable<Auth> {
    //const path = `${environment.url}/espectaculo`;
    const path = `http://localhost:38723/api/User`;
    return  this.http.post<Auth>(path,user);
  }
}
