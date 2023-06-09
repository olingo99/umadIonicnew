import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

/*
Component used to hold the tabs, contains the tabs and the tab bar. To display a tab, the route must be /tabs/tabName as defined in the app-routing.module.ts
*/


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  id=0;

  constructor(    private route : ActivatedRoute, private router: Router,) 
  {}

  ngOnInit(): void {
  this.route.queryParams.subscribe((params) => {  //get the user id from the url, used to set the id in the url of the tabs
    this.id = params['id'];
    this.router.navigate(['tabs/user'], { queryParams: { id: this.id } });
  });
}

}
