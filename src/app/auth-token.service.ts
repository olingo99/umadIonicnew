import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  private token: string = "";
  

  setToken(token: string) {
    console.log("setToken");
    console.log(token);
    // this.token = token;
    sessionStorage.setItem('token', token);
  }

  getToken() {
    console.log("getToken");
    // return this.token;
    return sessionStorage.getItem('token')!;
  }

  removeToken() {
    console.log("removeToken");
    // this.token = "";
    sessionStorage.removeItem('token');
  }
}
