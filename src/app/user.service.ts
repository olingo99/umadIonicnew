import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';

export class User {
  'iduser': number;
  'Name': string;
  'passWord': string;
  'Mood': number;
  'Admin': boolean;
  'token': string;
  'maxAge': number;

  constructor(){
    this.iduser = 0;
    this.Name = "";
    this.passWord = "";
    this.Mood = 0;
    this.Admin = false;
    this.token = "";
    this.maxAge = 0;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  tryLogin(Name:string, passWord: string): Observable<User> {

    return this.http.post<User>(baseUrl+'/login', {Name, passWord});
  }

  checkUserName(Name: string): Observable<User> {

    return this.http.get<User>(baseUrl+`/user/name/${Name}`);
  }

  addUser(Name: string, passWord: string): Observable<User> {
    return this.http.post<User>(baseUrl+'/user', {Name, passWord});
  }

  getMood(Id: Number): Observable<Number>{
    return this.http.get<Number>(baseUrl+`/user/${Id}/mood`);
  }



  getUserById(Id: Number): Observable<User>{
    return this.http.get<User>(baseUrl+`/user/${Id}`);
  }
  
}
  