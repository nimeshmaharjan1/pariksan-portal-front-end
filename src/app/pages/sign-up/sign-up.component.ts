import { Component, OnInit } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  
  showPassword = true;
  isStudent: boolean = false;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
    ) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isStudent: true,
    occupation: ''
  }

  ngOnInit(): void {
  }

  formSubmit(){
    this.spinner.show();
    if(this.user.username.trim() == '' || this.user.password.trim() == '' || this.user.firstName.trim() == '' || this.user.lastName.trim() == '' || this.user.email.trim() == '' || this.user.phone.trim() == ''){
      this.spinner.hide();
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Fields cannot be blank!'});
      return;
    }
    this.userService.addUser(this.user).subscribe(
      {
        next: (data:any) => {
          this.spinner.hide();
          //Sucess
          console.log(data)
          Swal.fire('Success', 'User Successfully Registered.', 'success');
        },
        error: (error) => {
          this.spinner.hide();
          //Error
          console.log(error)
          Swal.fire({
          icon: 'info',
          title: 'Username exists.',
          text: 'User with that username already exists.'});
        }
      }
    )
  }

  clear() {
    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      isStudent: false,
      occupation: ''
    }
  }

}
