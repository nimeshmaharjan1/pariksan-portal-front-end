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
      title: 'Categories',
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
      link: '/user-dashboard'
    },
    {
      title: 'Profile',
      icon: {icon:'smiling-face-outline',options: {animation:{ type: 'zoom' }}},
      link: '/user-dashboard/user-profile',
    },
    {
      title: 'Categories',
      icon: {icon:'list-outline',options: {animation:{ type: 'zoom' }}},
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
    },
    {
      title: 'Add Category',
      icon: {icon:'plus-outline',options: {animation:{ type: 'zoom' }}},
    },
    {
      title: 'Quizzes',
      icon: {icon:'book-outline',options: {animation:{ type: 'zoom' }}},
    },
    // {
    //   title: 'Logout',
    //   icon: {icon:'unlock-outline',options: {animation:{ type: 'zoom' }}},
    // },
  ];
  
  isLoggedIn: boolean = false;
  isStudent: boolean = false;
  isAdmin: boolean = false;

  constructor(public login: LoginService) { }

  ngOnInit(): void {
    console.log(this.login.isLoggedIn());
  }
}
