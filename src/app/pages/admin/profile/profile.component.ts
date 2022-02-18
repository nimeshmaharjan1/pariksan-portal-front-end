import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(private login: LoginService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getUser();
  }

  getUser() {
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)
    this.user = this.login.getUser();
  }
  

}
