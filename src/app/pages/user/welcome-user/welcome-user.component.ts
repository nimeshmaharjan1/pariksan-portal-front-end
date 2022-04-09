import { UserQuizService } from './../../../services/User-quiz/user-quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.scss'],
})
export class WelcomeUserComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private themeService: NbThemeService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private userQuizService: UserQuizService
  ) {}

  categories: any;
  url: any;
  attempts: any;
  quizzes: any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.url = params['categoryId'];
      this.attempts = this.userQuizService.attempts;
      console.log('Attempts: ', this.attempts);
    });

    this.categoryService.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.quizService.getQuizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
      },
    });
  }
}
