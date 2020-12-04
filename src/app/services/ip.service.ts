import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ip } from '../models/ip';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCurrentIp(): Observable<Ip> {
    const path = `https://api.ipify.org/?format=json`;
    return  this.http.get<Ip>(path);
  }

}
