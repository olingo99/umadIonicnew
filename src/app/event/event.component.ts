import { Component, Input } from '@angular/core';
import { Event } from '../event.service';
import { CategoryService, Category } from '../category.service';
import { User } from '../user.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() event: Event = new Event();  //Event to display
  @Input() user: User = new User(); //User to whom the event belongs


  category: Category = new Category();  //Category of the event

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategoryById(this.user.iduser, this.event.idcategory).subscribe({ //Get the category of the event
      next: (data) => {
        this.category = data; //Set the category
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.category = new Category();
      },
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }
  
  //Function used to get the color of the weight of the event
  getColor(weight: number): string {
    return weight > 0 ? "green" : "red";
  }
}
