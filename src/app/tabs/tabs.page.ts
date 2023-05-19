import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  id=0;

  constructor(    private route : ActivatedRoute,) {

  }

  ngOnInit(): void {
  this.route.queryParams.subscribe((params) => {
    console.warn('params[] home eeeeeeeeee')
    console.warn(params['id'])
    this.id = params['id'];
  });
}

}
