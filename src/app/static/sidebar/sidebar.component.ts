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
      icon: {icon:'home-outline',options: {animation:{ type: 'zoom' }}},
      link: '/',
    },
    {
      title: 'Dashboard',
      icon: {icon:'layout-outline',options: {animation:{ type: 'zoom' }}},
      link: '/admin'
    },
    {
      title: 'Profile',
      icon: {icon:'smiling-face-outline',options: {animation:{ type: 'zoom' }}},
      link: '/admin/profile',
    },
    {
      title: 'Categories',
      icon: {icon:'list-outline',options: {animation:{ type: 'zoom' }}},
    },
    // {
    //   title: 'Sign Up',
    //   icon: 'checkmark-circle-outline',
    //   link: '/signup'
    // },
    // {
    //   title: 'Login',
    //   icon: 'log-in-outline',
    //   link: '/login'
    // },
    // {
    //   title: 'Privacy Policy',
    //   icon: { icon: 'checkmark-outline', pack: 'eva' },
    // },
    {
      title: 'Logout',
      icon: {icon:'unlock-outline',options: {animation:{ type: 'zoom' }}},
    },
  ];
}
