import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';

/*
Service containing all the functions related to the user part of the API
*/


// User class
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

  //Try to login with the given username and password
  tryLogin(Name:string, passWord: string): Observable<User> {

    return this.http.post<User>(baseUrl+'/login', {Name, passWord});
  }
  //Check if the given username is already taken
  checkUserName(Name: string): Observable<User> {

    return this.http.get<User>(baseUrl+`/user/name/${Name}`);
  }
  //Add a new user with the given username and password
  addUser(Name: string, passWord: string): Observable<User> {
    return this.http.post<User>(baseUrl+'/user', {Name, passWord});
  }
  //get the mood of the user with the given id
  getMood(Id: Number): Observable<Number>{
    return this.http.get<Number>(baseUrl+`/user/${Id}/mood`);
  }


  //get the user with the given id
  getUserById(Id: Number): Observable<User>{
    return this.http.get<User>(baseUrl+`/user/${Id}`);
  }

  //get the image corresponding to the given mood not really the place for this function but didn't want to create a new file just for this
  getSourceImage(mood: number): string {
    if (mood >90){
      return "assets/images/verryHappy.png";
    }
    if (mood >=0){
      return "assets/images/happy.png";
    }
    return `assets/images/sad${Math.ceil(-mood/14)}.png`;
  }
  
}
  