import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from './../auth-token.service';
import { Router } from '@angular/router';
import { User, UserService } from './../user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{

  loginForm = this.formBuilder.group({
    username: 'postman',
    password: '123456'
  });

  resLabel: string = "";


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authTokenService: AuthTokenService
  ) { }

  onSubmit(id: string): void {

    if (id == "SignIn") { console.warn("signin"); this.signIn(); }
    else if (id == "SignUp") { console.warn("signup"); this.signUp(); }

  }

  signIn() {
    console.warn('Your order has been submitted', this.loginForm.value);
    if (this.loginForm.value.username !== null && this.loginForm.value.password !== null) {
      this.userService.tryLogin(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
        next: (data) => {
          console.warn(data)
          this.authTokenService.setToken(data.token);
          // this.router.navigate(['home'], { queryParams: { id: data.iduser } });
          this.router.navigate(['tabs'], { queryParams: { id: data.iduser } });

        },
        error: (error) => {
          this.resLabel = "Wrong username or password";
          console.log('error');
          console.log(error);
        },

      });
    }
    else {
      console.warn("rempli les champs stp");
    }
  }

  signUp() {
    if (this.loginForm.value.username !== null && this.loginForm.value.password !== null) {
      this.userService.checkUserName(this.loginForm.value.username!).subscribe({
        next: (data) => {
          this.resLabel = "Username already taken";
        },
        error: (error) => {
          if (error.status == 404 && this.loginForm.value.username !== "" && this.loginForm.value.password !== "") {
            this.userService.addUser(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
              next: (data) => {
                this.resLabel = "Account created";
              },
              error: (error) => {
                this.resLabel = "Error";
              }
            })
          }
          else {
            this.resLabel = "Please fill the fields";
          }

        }
      })
    }
  }

}
