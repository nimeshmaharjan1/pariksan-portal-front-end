import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  }

  constructor(private login: LoginService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
  }

  formSubmit(){
    this.spinner.show();
    console.log("Login button clicked")
    if (this.loginData.username.trim() === '' || this.loginData.username === null && this.loginData.password.trim() === '' || this.loginData.password === null) {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Please enter a valid username and password !'
      })
      return;
    } else if (this.loginData.username.trim() === '' || this.loginData.username === null) {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Username cannot be blank ! '
      })
      return;
    } else if (this.loginData.password.trim() === '' || this.loginData.password === null) {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Password cannot be blank ! '
      })
      return;
    }
    //REQUEST TO SERVER TO GENERATE TOKEN
    this.login.generateToken(this.loginData).subscribe(
      {
          next: (data: any) => {
            this.spinner.hide();
            console.log('Success');
            console.log(data);
            
            this.login.loginUser(data.token);
            this.login.getCurrentUser().subscribe(
              (user:any) => {
                this.login.setUser(user);
                console.log(user);
                //redirect ADMIN / STUDENT
                if (this.login.getUserRole() === 'ADMIN') {
                  this.spinner.hide();
                  // window.location.href = '/admin';
                  this.router.navigate(['admin/profile']);
                  this.login.logInStatusSubject.next(true);
    
                } else if (this.login.getUserRole() === 'STUDENT') {
                  this.spinner.hide();
                  // window.location.href = '/user-dashboard';
                  this.router.navigate(['user-dashboard']);
                  this.login.logInStatusSubject.next(true);
    
                } else {
                  this.spinner.hide();
                  this.login.logout();
                  location.reload();
                }
              });
          },
          error: (error) => {
            this.spinner.hide();
            console.log("Error");
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Please try again.'
            })
          }
        }
    )
  }
}
