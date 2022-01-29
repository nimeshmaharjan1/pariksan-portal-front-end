import { Component, OnInit } from '@angular/core';
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

  constructor(private login: LoginService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Login button clicked")
    if (this.loginData.username.trim() === '' || this.loginData.username === null && this.loginData.password.trim() === '' || this.loginData.password === null) {
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Please enter a valid username and password !'
      })
      return;
    } else if (this.loginData.username.trim() === '' || this.loginData.username === null) {
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Username cannot be blank ! '
      })
      return;
    } else if (this.loginData.password.trim() === '' || this.loginData.password === null) {
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Password cannot be blank ! '
      })
      return;
    }
    //REQUEST TO SERVER TO GENERATE TOKEN
    this.login.generateToken(this.loginData).subscribe(
    //   {
    //   next: (data: any) => console.log(data),
    //   error: (e) => console.error(e),
    //   complete: () => console.log('success')
      
    // }
      (data: any) => {
        console.log('Success');
        console.log(data);
        
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    )
  }
}
