import { Component, OnInit } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  
  showPassword = true;

  constructor(
    private userService: UserService,) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.user.username == null || this.user.username == ''){
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Username is required!'});
      return;
    }
    this.userService.addUser(this.user).subscribe(
    //   {
    //   next: (data: any) => console.log(data, 'success'),
    //   error: (e) => console.error(e, 'error'),
    //   complete: () => console.log('success')
    // }
      (data) => {
        //Sucess
        console.log(data)
        Swal.fire('Success', 'User Successfully Registered.', 'success');
      },
      (error) => {
        //Error
        console.log(error)
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A user already exists with this username.'});
      }
      )
  }

}
