import { Component } from '@angular/core';
import { User} from '../user.service';
import {Input} from '@angular/core';
import { FriendsService, FriendMap } from '../friends.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {
  // friends: string[] = ["friend1", "friend2", "friend3"];
  user: User = new User();
  test = new User();
  friends: User[] = [this.test];
  active : boolean = false;
  friendRequests: User[] = [];
  constructor(
    private friendsService: FriendsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  friendForm = this.formBuilder.group({
    friendName: ''
  });

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      console.warn('params[] home')
      console.warn(params['id'])
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user =  data;
          this.friendsService.getFriends(this.user.iduser).subscribe({
            next : (data) => {
              console.warn("here is the friend list")
              console.warn(data);
              this.friends = data;
              // this.active = true;
              this.getRequests();
            },
            error : (error) => {
              console.log(error);
              this.friends = [];
              this.getRequests();
              // this.active = true;
            }
          }
          );
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        },
      });
    });

  }

  ngOnChanges() {
    console.warn("user component")
    this.ngOnInit();
  }

  onSubmitFriendForm() {
    console.warn("friend form submitted");
    console.warn(this.friendForm.value);
    this.friendsService.addFriend(this.user.iduser, this.friendForm.value.friendName!).subscribe({
      next : (data) => {
        console.warn("here is the friend list")
        console.warn(data);
        // this.ngOnInit();
      },
      error : (error) => {
        console.log("error fiends");
        console.log(error);
      }
    });
  }

  getRequests():void {
    console.warn("getting friend requests");
    this.friendsService.getFriendRequests(this.user.iduser).subscribe({
      next : (data) => {
        console.warn("here is the friend request list");
        console.warn(data);
        this.friendRequests = data;
        this.active = true;
      },
      error : (error) => {
        console.warn("here is the friend request list error");
        console.log(error);
        this.friendRequests = [];
        this.active = true;
      }
    });
  }

  acceptFriendRequest(friendRequest: User):void{
    this.friendsService.acceptFriendRequest(this.user.iduser, friendRequest.iduser).subscribe({
      next : (data) => {
        console.warn("accepeted friend request")
        console.warn(data);
        this.ngOnInit();
      },
      error : (error) => {
        console.log(error);
      }
    });
  }

  declineFriendRequest(friendRequest:User):void{
    this.friendsService.declineFriendRequest(this.user.iduser, friendRequest.iduser).subscribe({
      next : (data) => {
        console.warn("declined friend request")
        console.warn(data);
        this.ngOnInit();
      },
      error : (error) => {
        console.log(error);
      }
    });

  }
}
