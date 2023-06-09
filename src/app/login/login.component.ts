import { Component,} from '@angular/core';
import { AuthTokenService } from './../auth-token.service';
import { Router } from '@angular/router';
import {UserService } from './../user.service';
import { FormBuilder } from '@angular/forms';



/*
Component used to handle the login page, contains the login and signup form
*/



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{

  loginForm = this.formBuilder.group({ //Form used to handle the login and signup, contaisn 2 fields, username and password
    username: '',
    password: ''
  });

  resLabel: string = ""; //Label used to display the result of the login or signup


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authTokenService: AuthTokenService
  ) { }

    //Called when the user click on the login or signup button, call the corresponding function
  onSubmit(id: string): void {
    if (id == "SignIn") {this.signIn(); }
    else if (id == "SignUp") {this.signUp(); }

  }

  //Called when the user click on the login button, try to login the user with the username and password entered in the form
  signIn() {
    if (this.loginForm.value.username !== '' && this.loginForm.value.password !== '') { //Check if the fields are not empty
      this.userService.tryLogin(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({ //Call the tryLogin function of the userService
        next: (data) => {                                                               //If the login is successful, set the token and the connected user in the authTokenService and redirect the user to the home page
          this.authTokenService.setToken(data.token);
          this.authTokenService.setConnectedUser(data.iduser);
          this.router.navigate(['tabs'], { queryParams: { id: data.iduser } });
        },
        error: (error) => {
          this.resLabel = "Wrong username or password"; //If the login is not successful, display an error message
          console.log('error');
          console.log(error);
        },

      });
    }
    else {
      this.resLabel = "Please fill the fields";   //If the fields are empty, display an error message
    }
  }

  //Called when the user click on the signup button, try to create a new user with the username and password entered in the form
  signUp() {
    if (this.loginForm.value.username !== '' && this.loginForm.value.password !== '') { //Check if the fields are not empty
      this.userService.checkUserName(this.loginForm.value.username!).subscribe({  //Call the checkUserName function of the userService, returns an 404 error if the username is not already taken
        next: (data) => {                                                        //If the username is already taken, display an error message
          this.resLabel = "Username already taken";
        },
        error: (error) => {
          if (error.status == 404 && this.loginForm.value.username !== "" && this.loginForm.value.password !== "") {  //If the username is not taken and the fields are not empty strings, call the addUser function of the userService
            this.userService.addUser(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
              next: (data) => {                                                    //If the user is created, display a success message
                this.resLabel = "Account created";
              },
              error: (error) => {                                                 //If the user is not created, display an error message
                this.resLabel = "Error";
                console.log('error');
                console.log(error);
              }
            })
          }
          else {
            this.resLabel = "Please fill the fields";                                   //If the fields are empty, display an error message
          }

        }
      })
    }
  }


}
