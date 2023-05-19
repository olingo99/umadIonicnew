import { Component, Input,Output, EventEmitter } from '@angular/core';
import { Event } from '../event.service';
import { CategoryService, Category } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() event: Event = new Event();
  // @Input() event: string= "";
  @Input() user: User = new User();


  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.warn('event init');
    console.log(this.event);

    this.categoryService.getCategoryById(this.user.iduser, this.event.idcategory).subscribe({
      next: (data) => {
        console.warn(data)
        this.category = data;
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.category = new Category();
      },
    });

    // this.route.params.subscribe((params) => {
    //   this.categoryService.getCategoryById(params['id'], this.event.idcategory).subscribe({
    //     next: (data) => {
    //       console.warn(data)
    //       this.category = data;
    //     },
    //     error: (error) => {
    //       console.log('error');
    //       console.log(error);
    //     },
    //   });
    // }
    // );



    // this.categoryService.getCategoryById(this.event.idcategory).subscribe({
    //   next: (data) => {
    //     console.warn(data)
    //     this.category = data;
    //   },
    //   error: (error) => {
    //     console.log('error');
    //     console.log(error);
    //   },
    // });
  }

  ngOnChanges() {
    console.warn("user component")
    this.ngOnInit();
  }

  getColor(weight: number): string {
    return weight > 0 ? "green" : "red";
  }
}
