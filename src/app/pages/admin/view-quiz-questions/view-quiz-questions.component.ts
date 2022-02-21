import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NgxSpinnerService
} from 'ngx-spinner';
import {
  QuestionService
} from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.scss']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId;
  quizTitle;
  questions = []
  showAnswer: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this.quizTitle = this.route.snapshot.params['title'];
    this.spinner.show();
    this.getQuestion();
    console.log(this.questions);
    
  }
  getQuestion() {
    this.questionService.getQuestionsofQuiz(this.quizId).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.questions = data;
        console.log(data);

      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);

      }
    })
  }
  showAns() {
    this.showAnswer = !this.showAnswer;
  }
  deleteQuestion(questionId) {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'info',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.questionService.deleteQuestion(questionId).subscribe({
            next: (data: any) => {
              Swal.fire('Success', 'Question has been deleted', 'success');
              this.questions = this.questions.filter((q) => q.questionId !== questionId);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    )
  }
}