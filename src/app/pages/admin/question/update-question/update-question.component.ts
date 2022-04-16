import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../../services/question/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss'],
})
export class UpdateQuestionComponent implements OnInit {
  quizId: any;
  quizTitle: any;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  questionId;
  question;

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    this.quizId = this.route.snapshot.params['quizId'];
    this.quizTitle = this.route.snapshot.params['title'];
    this.getQuestions();
  }
  getQuestions() {
    this.spinner.show();
    this.questionService.getQuestion(this.questionId).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.question = data;
        Swal.fire('Success', 'The question has been fetched', 'success');
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      },
    });
  }

  submit() {
    this.spinner.show();
    this.questionService.updateQuestion(this.question).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        Swal.fire('Success', 'Question has been updated.', 'success').then(
          (e) => {
            this.router.navigate([
              '/admin/view-question/' + this.quizId + '/' + this.quizTitle,
            ]);
          }
        );
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      },
    });
  }
  back() {
    this.router.navigate([
      `/admin/view-question/${this.quizId}/${this.quizTitle}`,
    ]);
  }
}
