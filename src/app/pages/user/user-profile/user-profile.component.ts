import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoginService} from 'src/app/services/login.service';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user;

  constructor(private login: LoginService,
              private spinner: NgxSpinnerService,
              private userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getUser();
  }

  getUser() {
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)
    this.user = this.login.getUser();
    console.log(this.user)
  }
  getUserDetails() {
    this.userService.updateUser(this.user).subscribe({
      next: (data:any) => {
        console.log('updated')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  updateUser() {
    this.router.navigate(['user-dashboard/update-user'])
}
}
