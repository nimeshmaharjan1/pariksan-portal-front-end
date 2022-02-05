import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user;

  constructor(private login: LoginService) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    console.log(this.user.firstName);
  }

}
