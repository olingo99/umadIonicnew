import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';
import { User } from './user.service';

/*
Service containing all the functions related to the friends part of the API
*/


// FriendMap class
export class FriendMap{
  'idfriendsmap': number;
  'iduser': number;
  'date': Date;
  'idfriend': number;

  constructor(){
    this.idfriendsmap = 0;
    this.iduser = 0;
    this.date = new Date();
    this.idfriend = 0;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http : HttpClient ) { }

  //get the friends of the user with the given id
  getFriends(Id: Number): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+`/user/${Id}/friends`);
  }

  //Create a new friend request
  addFriend(IdUser: Number, Name: String): Observable<FriendMap>{
    return this.http.post<FriendMap>(baseUrl+`/user/${IdUser}/friends`, {username: Name});
  }

  //Accept a friend request identified by the given id of the user and the id of the friend
  acceptFriendRequest(IdUser: Number, IdFriend: Number): Observable<User>{
    return this.http.post<User>(baseUrl+`/user/${IdUser}/acceptFriend`, {idfriend: IdFriend});
  }

  //Decline a friend request identified by the given id of the user and the id of the friend
  declineFriendRequest(IdUser: Number, IdFriend: Number): Observable<User>{
    return this.http.post<User>(baseUrl+`/user/${IdUser}/declineFriend`, {idfriend: IdFriend});
  }

  //get the friend requests of the user with the given id
  getFriendRequests(Id: Number): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+`/user/${Id}/friendRequests`);
  }

}
