import { Login } from './../models/login,interface';
import { User } from './../models/register.interface';
import { IaddName } from './../models/name.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  addName(data: IaddName) {
    return this.http.post('http://localhost:3000/api/v1/user', data)
  }
  getName(id: any) {
    return this.http.get(`http://localhost:3000/api/v1/user/${id}`)
  }
  register(data: User) {
    return this.http.post('http://localhost:3000/api/v1/user/register', data)

  }
  login(data: Login) {
    return this.http.post('http://localhost:3000/api/v1/auth/login', data)
  }
  getUser(){
    return this.http.get('http://localhost:3000/api/v1/user/user')
  }
}
