import { Injectable } from '@angular/core';

/*
Service used to handle the storage of the token and the connected user id, they are stored in the sessionStorage
*/


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { sessionStorage.setItem('token', "");}
  
  //Set the token
  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  //Set the connected user id
  setConnectedUser(id: number) {
    sessionStorage.setItem('connectedUser', id.toString());
  }

  //Get the token
  getToken() {
    return sessionStorage.getItem('token')!;
  }

  //Get the connected user id
  getConnectedUser() {
    return sessionStorage.getItem('connectedUser')!;
  }


  //Remove the token from the sessionStorage
  removeToken() {
    sessionStorage.removeItem('token');
  }

  //Remove the connected user id from the sessionStorage
  removeConnectedUser() {
    sessionStorage.removeItem('connectedUser');
  }
}
