import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuardGuard } from './services/admin-guard.guard';
import { LoginGuard } from './services/login.guard';
import { StudentGuard } from './services/student.guard';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch:'full',
  },
  {
    path:'signup',
    component: SignUpComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch:'full',
  },
  {
    path:'admin',
    component: DashboardComponent,
    pathMatch:'full',
    canActivate: [AdminGuardGuard]
  },
  {
    path:'user-dashboard',
    component: UserDashboardComponent,
    pathMatch:'full',
    canActivate: [StudentGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
