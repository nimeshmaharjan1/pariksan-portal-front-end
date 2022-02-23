import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.scss']
})
export class WelcomeUserComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private themeService: NbThemeService,
    private quizService: QuizService
  ) { 
  }

  categories: any;

  ngOnInit(): void {
    this.categoryService.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.quizService.getQuizzes().subscribe({
      next: (data:any) => {
        console.log(data);
        
      }
    })
  }

}
