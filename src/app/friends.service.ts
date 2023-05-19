import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';
import { User } from './user.service';


// export class Friend{
//   'idfriendsmap': number;
//   'iduser': number;
//   'date': Date;
//   'idfriend': number;

//   constructor(){
//     this.idfriendsmap = 0;
//     this.iduser = 0;
//     this.date = new Date();
//     this.idfriend = 0;
//   }
// }

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

  getFriends(Id: Number): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+`/user/${Id}/friends`);
  }

  addFriend(IdUser: Number, Name: String): Observable<FriendMap>{
    return this.http.post<FriendMap>(baseUrl+`/user/${IdUser}/friends`, {username: Name});
  }

  acceptFriendRequest(IdUser: Number, IdFriend: Number): Observable<User>{
    return this.http.post<User>(baseUrl+`/user/${IdUser}/acceptFriend`, {idfriend: IdFriend});
  }

  declineFriendRequest(IdUser: Number, IdFriend: Number): Observable<User>{
    return this.http.post<User>(baseUrl+`/user/${IdUser}/declineFriend`, {idfriend: IdFriend});
  }

  getFriendRequests(Id: Number): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+`/user/${Id}/friendRequests`);
  }

}
