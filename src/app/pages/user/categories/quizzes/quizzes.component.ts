import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  categoryId: any;
  quizzes: any;
  categoryTitle: any;

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => {
      this.categoryId = params['categoryId'];
      this.categoryTitle = params['categoryTitle'];
      console.log(this.categoryId);
      this.quizService.getActiveQuizzesOfCategory(this.categoryId).subscribe({
        next: (data: any) => {
          this.spinner.hide();
          this.quizzes = data;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        },
      });
    });
  }
}
