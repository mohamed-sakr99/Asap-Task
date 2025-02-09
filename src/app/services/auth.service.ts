import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

//Login Method 
  login(data:IUser) {
    return this.http.post<IUser>(`${environment.BASE_API_URL}/auth/login`, data)
  }
  
}
