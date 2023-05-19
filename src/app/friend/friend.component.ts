import { Component } from '@angular/core';
import {Input} from '@angular/core';
import { User } from '../user.service';
import { Event, EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {
  @Input() friend: User = new User();
  event: Event = new Event();
  active: boolean = false;

  imageSource: string = "assets/images/happy.png";

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }


  ngOnInit() {
    this.imageSource = this.getSourceImage(this.friend.Mood);
    this.eventService.getLastEventsByUserId(this.friend.iduser).subscribe({
      next : (data) => {
        console.warn("last event data ");
        console.warn(data);
        this.event = data[0];
        this.active = true;
      },
      error : (error) => {
        console.log(error);
        this.event = new Event();
        this.active = true;
      }
    });

  }

  ngOnChanges() {
    console.warn("user component")
    this.ngOnInit();
  }

  friendClick() {
    console.warn("friend click");
    this.router.navigate(['/home'], { queryParams: { id: this.friend.iduser } });
  //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/home'], { queryParams: { id: this.friend.iduser } });
  // });
  }

  getSourceImage(mood: number): string {
    if (mood <-90){
      return "assets/images/verryHappy.png";
    }
    if (mood <=0){
      return "assets/images/happy.png";
    }
    return `assets/images/sad${Math.ceil(mood/14)}.png`;
  }
}
