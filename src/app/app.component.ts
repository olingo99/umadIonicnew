import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'umadAngularfeur';
  id = 0;
  doneInit = false;

  ngOnInit(): void {
    this.id = +this.router.url.split("=").splice(-1);
    console.log(this.id);
    console.log("init here");
    this.doneInit = true;
  }

  displayTopBar=false;
  // test = ;

  constructor(
    public router: Router,
    private authTokenService: AuthTokenService

    ) { }

  goHome():void{
    //read id from base url
    // console.log("url")
    // console.log(this.router.url)
    console.log("feur")
    let id = +this.router.url.split("=").splice(-1)
    // console.log(this.router.url.split("=").splice(-1))

    this.router.navigate(['/home'], { queryParams: { id: id} });
  }

  disconnect():void{
    this.authTokenService.removeToken();
    this.router.navigate(['/login']);
  }

}
