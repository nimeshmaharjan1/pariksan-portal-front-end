import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: {icon:'home-outline',options: {animation:{ type: 'zoom' }}},
      link: '/',
    },
    {
      title: 'About Us',
      icon: {icon:'list-outline',options: {animation:{ type: 'zoom' }}},
    },
    {
      title: 'Sign Up',
      icon: 'checkmark-circle-outline',
      link: '/signup'
    },
    {
      title: 'Login',
      icon: 'log-in-outline',
      link: '/login'
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
    },
  ];
  userItems: NbMenuItem[] = [
    {
      title: 'Home',
      icon: {icon:'home-outline',options: {animation:{ type: 'zoom' }}},
      link: '/',
    },
    {
      title: 'Dashboard',
      icon: {icon:'layout-outline',options: {animation:{ type: 'zoom' }}},
      link: '/user-dashboard/0'
    },
    {
      title: 'Profile',
      icon: {icon:'smiling-face-outline',options: {animation:{ type: 'zoom' }}},
      link: '/user-dashboard/user-profile',
    },
    {
      title: 'Categories',
      icon: {icon:'list-outline',options: {animation:{ type: 'zoom' }}},
      link: 'user-dashboard/category/:categoryId'
    },
    {
      title: 'Logout',
      icon: {icon:'unlock-outline',options: {animation:{ type: 'zoom' }}},
    },
  ];
  adminItems: NbMenuItem[] = [
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
      link: '/admin/categories'
    },
    {
      title: 'Quizzes',
      icon: {icon:'book-outline',options: {animation:{ type: 'zoom' }}},
      link: 'admin/quizzes'
    },
    // {
    //   title: 'Logout',
    //   icon: {icon:'unlock-outline',options: {animation:{ type: 'zoom' }}},
    // },
  ];

  constructor(public login: LoginService) { }

  ngOnInit(): void {
  }
}
