import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  register(user) {
    return this.http.post('http://127.0.0.1:5000/register', user);
  }

}

