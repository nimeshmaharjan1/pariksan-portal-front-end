import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuardGuard } from './services/admin-guard.guard';
import { LoginGuard } from './services/login.guard';
import { StudentGuard } from './services/student.guard';
import { WelcomePageComponent } from './pages/admin/welcome-page/welcome-page.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { WelcomeUserComponent } from './pages/user/welcome-user/welcome-user.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import {UpdateQuestionComponent} from "./pages/admin/question/update-question/update-question.component";
import { CategoriesComponent } from './pages/user/categories/categories.component';
import { QuizzesComponent } from './pages/user/categories/quizzes/quizzes.component';

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
    canActivate: [AdminGuardGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '',
        component: WelcomePageComponent
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent
      },
      {
        path: 'update-category/:categoryId',
        component: UpdateCategoryComponent
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent
      },
      {
        path: 'update-quiz/:quizId',
        component: UpdateQuizComponent
      },
      {
        path: 'view-question/:quizId/:title',
        component: ViewQuizQuestionsComponent
      },
      {
        path: 'add-question/:quizId/:title',
        component: AddQuestionsComponent
      },
      {
        path: 'update-question/:quizId/:title/:questionId',
        component: UpdateQuestionComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [StudentGuard],
    children: [
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: ':categoryId',
        component: WelcomeUserComponent,
      },
      {
        path: 'category/:categoryId',
        component: CategoriesComponent,
      },
      {
        path: 'categories/quizzes/:categoryId/:categoryTitle',
        component: QuizzesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
