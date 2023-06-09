import { Component } from '@angular/core';
import { Event, EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { User} from '../user.service';
import { UserService } from '../user.service';

/*
Component used to display the events of the day of the user. Uses the event component to display the events.
*/




@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.css']
})
export class EventDayComponent {

  events: Event[] = []; //Events of the day

  user: User = new User();  //User to whom the events belong

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {  //get the user id from the url
      this.userService.getUserById(params['id']).subscribe({  //get the user
        next: (data) => {
          this.user =  data;
          this.eventService.getTodayEventsByUserId(this.user.iduser).subscribe({  //get the events of the day of the user
            next: (data) => {
              this.events = data;
            },
            error: (error) => {
              console.log('error');
              console.log(error);
              this.events = [];
            },
          });
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
