import { Component } from '@angular/core';
import { User} from '../user.service';
import { FriendsService} from '../friends.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

/*
Component used to display the friend list of a user, friend request have been removed from the app as the mobile screen  requries soem design changes to be able to display it all , to be added later
*/

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {
  user: User = new User();    //user for which the friend list is displayed
  friends: User[] = [];  //list of friends of the user
  active : boolean = false; //Boolean used to display the component only when the data is loaded
  resstring: string = "";
  // friendRequests: User[] = [];  //list of friend requests of the user
  
  constructor(
    private friendsService: FriendsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  //form used to add a friend
  friendForm = this.formBuilder.group({
    friendName: ''
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {  //get the user id from the url
      this.userService.getUserById(params['id']).subscribe({  //get the user data
        next: (data) => {
          this.user =  data;
          this.friendsService.getFriends(this.user.iduser).subscribe({  //get the friends of the user
            next : (data) => {
              this.friends = data;
              // this.getRequests(); //get the friend requests of the user
            },
            error : (error) => {
              console.log(error);
              this.friends = [];
              // this.getRequests();
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
    this.ngOnInit();
  }

  //called when the user submits the form to add a friend
  onSubmitFriendForm() {
    this.friendsService.addFriend(this.user.iduser, this.friendForm.value.friendName!).subscribe({  //add the friend
      next : (data) => {
        this.resstring = "Friend added";  //display the result
      },
      error : (error) => {
        this.resstring = "Error adding friend"; //display the result
        console.log("error fiends");
        console.log(error);
      }
    });
  }



  // acceptFriendRequest(friendRequest: User):void{
  //   this.friendsService.acceptFriendRequest(this.user.iduser, friendRequest.iduser).subscribe({
  //     next : (data) => {
  //       console.warn("accepeted friend request")
  //       console.warn(data);
  //       this.ngOnInit();
  //     },
  //     error : (error) => {
  //       console.log(error);
  //     }
  //   });
  // }

  // declineFriendRequest(friendRequest:User):void{
  //   this.friendsService.declineFriendRequest(this.user.iduser, friendRequest.iduser).subscribe({
  //     next : (data) => {
  //       console.warn("declined friend request")
  //       console.warn(data);
  //       this.ngOnInit();
  //     },
  //     error : (error) => {
  //       console.log(error);
  //     }
  //   });

  // }

    // getRequests():void {
  //   console.warn("getting friend requests");
  //   this.friendsService.getFriendRequests(this.user.iduser).subscribe({
  //     next : (data) => {
  //       console.warn("here is the friend request list");
  //       console.warn(data);
  //       this.friendRequests = data;
  //       this.active = true;
  //     },
  //     error : (error) => {
  //       console.warn("here is the friend request list error");
  //       console.log(error);
  //       this.friendRequests = [];
  //       this.active = true;
  //     }
  //   });
  // }
}
