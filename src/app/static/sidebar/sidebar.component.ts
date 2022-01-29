import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/login'
    },
    {
      title: 'Categories',
      icon: 'list-outline',
    },
    {
      title: 'Sign Up',
      icon: 'checkmark-circle-outline',
      link: '/signup'
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
    },
    {
      title: 'Login',
      icon: 'log-in-outline',
      link: '/login'
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
    },
  ];
}
