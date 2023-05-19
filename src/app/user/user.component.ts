import { Component, ElementRef } from '@angular/core';
import {Input} from '@angular/core';
import { User, UserService} from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Event, EventService} from '../event.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user: User = new User();
  event: Event = new Event();
  imageSource: string = "assets/images/happy.png";
  isAddEventActive: boolean = false;
  active: boolean = false;
  constructor(
    private userService: UserService,
    private elementRef : ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
    ) { }


  ngOnInit() {
    console.log("ngOnInit feur");
    this.route.queryParams.subscribe((params) => {
      console.warn('params[] home')
      console.warn(params['id'])
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user =  data;
          console.warn('user');
          console.warn(typeof data);
          console.warn("user component")
          console.warn(this.user);
          console.warn(this.user.Mood);
          // this.elementRef.nativeElement.style.setProperty('--progress', ((100-this.user.Mood)/2) + '%');
          this.elementRef.nativeElement.style.setProperty('--progress', ((100+this.user.Mood)/2) + '%');
      
          this.imageSource = this.getSourceImage(this.user.Mood);

          this.eventService.getLastEventsByUserId(params['id']).subscribe({
            next: (data) => {
              this.event = data[0];


              this.active = true;
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
    console.warn("user component")
    this.ngOnInit();
  }


  getSourceImage(mood: number): string {
    if (mood >90){
      return "assets/images/verryHappy.png";
    }
    if (mood >=0){
      return "assets/images/happy.png";
    }
    return `assets/images/sad${Math.ceil(-mood/14)}.png`;
  }

  addEvent() {
    // this.router.navigate(['/addEvent', this.user.Id]);
    this.router.navigate(['/eventCreation'], { queryParams: { id: this.user.iduser } });
  }

  seeEvents() {
    this.router.navigate(['/allEvents'], { queryParams: { id: this.user.iduser } });
  }
}
