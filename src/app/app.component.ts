import { Component } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  layout: any = {};
  sidebar: any = {};

  private alive = true;

  title = 'pariksan_portal-frontend';
}
