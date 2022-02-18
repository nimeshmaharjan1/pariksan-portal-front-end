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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  user = null;

  constructor(private sidebarService: NbSidebarService,
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

  layout: any = {};
  sidebar: any = {};
  isCompact = true;

  private alive = true;

  title = 'pariksan_portal-frontend';

  toggleCompact() {
    this.sidebarService.toggle(true);
    this.isCompact = !this.isCompact;
  }

  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.logInStatusSubject.next(false);
  }
}