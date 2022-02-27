import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {

  constructor(private quizService: QuizService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private categoryService: CategoryService
    ) { }

  quizzes: any;
  categoryId;
  quizOfCategory: any;
  isCategoryIdZero = false;
  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];

      if (this.categoryId == 0) {
        this.isCategoryIdZero = true;
        this.quizService.getActiveQuizzes().subscribe({
          next: (data:any) => {
            this.spinner.hide();
            this.quizzes = data;
          },
          error: (data:any) => {
            this.spinner.hide();
            Swal.fire('Error', 'Some error has occurred.', 'error')
            console.log(data);
          }
        })
      } else {
        this.isCategoryIdZero = false;
        this.quizService.getActiveQuizzesOfCategory(this.categoryId).subscribe({
          next: (data:any) => {
            this.spinner.hide();
            this.quizOfCategory = data;
            console.log('quizOfCategory:', this.quizOfCategory);
          },
          error: (data:any) => {
            this.spinner.hide();
            Swal.fire('Error', 'Some error has occurred.', 'error')
            console.log(data);
          }
        })
      }
    })
  }

}
