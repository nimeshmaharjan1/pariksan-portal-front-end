import { Component, Inject, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService, NB_WINDOW } from '@nebular/theme';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items = [
    {
      title: 'Profile',
      icon: 'person-outline'
    },
    {
      title: 'Edit',
      icon: 'options-2-outline',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
    },
  ]

  constructor(private sidebarService: NbSidebarService,private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) { }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(name => this.window.alert(`${name} was clicked!`));
  }
  toggle() {
    this.sidebarService.toggle();
  }
}
