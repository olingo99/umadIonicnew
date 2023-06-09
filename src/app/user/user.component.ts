import { Component, ElementRef } from '@angular/core';
import { User, UserService} from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Event, EventService} from '../event.service';

/*
Component used to display the user data in the home page, contains the user name, the user mood and the user image changing depending on the mood. This component is used in the home page
*/


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user: User = new User();  //user to display
  event: Event = new Event(); //last event of the user
  imageSource: string = "assets/images/happy.png";  //image to display
  // isAddEventActive: boolean = false;  //is the add event form displayed
  active: boolean = false; //Boolean used to display the component only when the data is loaded
  constructor(
    private userService: UserService,
    private elementRef : ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
    ) { }


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {  //get the user id from the url
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user =  data;
          this.elementRef.nativeElement.style.setProperty('--progress', ((100+this.user.Mood)/2) + '%');  //change the progress bar indicator position depending on the mood
          this.imageSource = this.userService.getSourceImage(this.user.Mood); //change the image depending on the mood

          this.eventService.getLastEventsByUserId(params['id']).subscribe({ //get the last event of the user
            next: (data) => {
              this.event = data[0];
              this.active = true;   //display the component
            }});
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
}
