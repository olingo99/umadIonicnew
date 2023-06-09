import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';

/*
First component loaded when the app is launched, Contains the top bar and the router-outlet. The router outlet directly displays the login component
*/


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'umadAngularfeur';
  id = 0; 
  // doneInit = false;   

  ngOnInit(): void {
    this.id = +this.router.url.split("=").splice(-1);
    // this.doneInit = true;
  }

  // displayTopBar=false;  //hide the top bar in the login page

  constructor(
    public router: Router,
    private authTokenService: AuthTokenService
    ) { }

  //function called when the user clicks on the home button
  goHome():void{
    let id = +this.router.url.split("=").splice(-1)
    this.router.navigate(['/home'], { queryParams: { id: id} });
  }

  //function called when the user clicks on the disconnect button
  disconnect():void{
    this.authTokenService.removeToken();
    this.router.navigate(['/login']);
  }

}
