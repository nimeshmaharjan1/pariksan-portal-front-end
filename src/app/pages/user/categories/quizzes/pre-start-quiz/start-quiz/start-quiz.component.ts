import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeoutError } from 'rxjs';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent implements OnInit {
  quizId: any;
  questions: any;
  attempted: number = 0;
  marksGot: number = 0;
  correctAnswers: number = 0;
  wrongAnswers: number = 0;
  isSubmitted: boolean = false;


  constructor(private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuizId();
    this.preventBackButton();
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getShuffledQuestions(this.quizId).subscribe(
      {
        next: (data: any) => {
          this.questions = data;
          this.questions.forEach(
            (question: any) => {
              question['selectedOption'] = '';
            }
          )
          console.log(data);
        },
        error: (err) => {
          console.log(err);
          
        }
      }
    )
  }
  getQuizId() {
    this.quizId = this.route.snapshot.params['quizId'];
    console.log(this.quizId);
  }
  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationSt.onPopState(
      () => {
        history.pushState(null, 'null', location.href);
      }
    )
  }
  submit() {
    Swal.fire({
      title: 'Do you want to submit?',
      icon: 'info',
      confirmButtonText: 'Submit',
      showCancelButton: true
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.isSubmitted = true;
          this.questions.forEach(
            (question: { selectedOption: any; answer: any; }) => {
              if (question.selectedOption == question.answer) {
                this.correctAnswers++;
                let mark = this.questions[0].quiz.maxMarks / this.questions.length;
                this.marksGot += mark;
              }
              if (question.selectedOption != '') {
                this.attempted++;
              }
              if (question.selectedOption != question.answer) {
                this.wrongAnswers++;
              }
            }
          );
          console.log('correct answers: ', this.correctAnswers);
          console.log('total marks: ', this.marksGot);
          console.log('attempted: ', this.attempted);
          console.log('wrong: ', this.wrongAnswers);
          
        }
      }
    )
  }

}
