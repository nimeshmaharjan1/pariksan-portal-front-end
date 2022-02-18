<<<<<<< HEAD
import {
  Component,
  OnInit
} from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';
import {
  NgxSpinnerService
} from 'ngx-spinner';
import {
  LoginService
} from './services/login.service';
=======
import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { LoginService } from './services/login.service';
>>>>>>> 75d65e2c8bb729672b432acd3fd9965ebc256406

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  user = null;

  constructor(private sidebarService: NbSidebarService,
<<<<<<< HEAD
    public login: LoginService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide()
    }, 4000)
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.logInStatusSubject.asObservable().subscribe(
      (data) => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
  }
=======
              public login: LoginService,
              private ngxSpinner: NgxSpinnerService
     ) { }

     ngOnInit(): void {
       this.ngxSpinner.show();
       setTimeout(
         () => {
           this.ngxSpinner.hide()
         }, 5000
       )
         this.isLoggedIn = this.login.isLoggedIn();
         this.user = this.login.getUser();
         this.login.logInStatusSubject.asObservable().subscribe(
           (data) => {
            this.isLoggedIn = this.login.isLoggedIn();
            this.user = this.login.getUser();
           }
         )
     }
>>>>>>> 75d65e2c8bb729672b432acd3fd9965ebc256406

  layout: any = {};
  sidebar: any = {};
  isCompact = true;

  private alive = true;

  title = 'pariksan_portal-frontend';

  toggleCompact() {
    this.sidebarService.toggle(true);
    this.isCompact = !this.isCompact;
<<<<<<< HEAD
  }

  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.logInStatusSubject.next(false);
  }
}
=======
}

public logout(){
  Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'info',
      confirmButtonText: 'Logout',
      showCancelButton: true
    })
    .then(
      (result) => {
        if (result.isConfirmed) {
          this.login.logout();
          window.location.reload();
        } else {
          return;
        }
      }
    )
}
}
>>>>>>> 75d65e2c8bb729672b432acd3fd9965ebc256406
