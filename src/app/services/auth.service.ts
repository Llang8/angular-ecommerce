import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `http://127.0.0.1:5000/login/`;
    return this.http.post<User>(url, {email, password});
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `http://127.0.0.1:5000/register`;
    return this.http.post<User>(url, {email, password});
  }
}

