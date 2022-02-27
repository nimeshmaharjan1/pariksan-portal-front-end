import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private spinner: NgxSpinnerService
  ) { }

  categoryId: any;
  quizzes:any;
  categoryTitle;
  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId']
      this.categoryTitle = params['categoryTitle']
      console.log(this.categoryId);
      this.quizService.getActiveQuizzesOfCategory(this.categoryId).subscribe({
        next: (data:any) => {
          this.spinner.hide();
          this.quizzes = data;
          console.log(data);
          
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
        }
      })
    })
  }

}
