import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/login.service";
import Swal from "sweetalert2";
import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  constructor(private loginService: LoginService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private userService: UserService) { }
  userDetails:any;
  ngOnInit(): void {
    this.userDetails = this.loginService.getUser();
    console.log(this.userDetails)
  }
  submit() {
    this.spinner.show();
    this.userService.updateUser(this.userDetails).subscribe({
      next: (data:any) => {
        this.spinner.hide();
        Swal.fire('Success', 'User has been updated.', 'success').then(
          (e) => {
            this.router.navigate(['/user-dashboard/user-profile']);
          }
        )
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      }
    })
  }
}
