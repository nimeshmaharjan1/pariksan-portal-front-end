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
  styleUrls: ['./start-quiz.component.scss'],
})
export class StartQuizComponent implements OnInit {
  quizId: any;
  questions: any;
  attempted: any;
  marksGot: any;
  correctAnswers: any;
  wrongAnswers: number = 0;
  isSubmitted: boolean = false;
  timer: any;
  time: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.getQuizId();
    this.preventBackButton();
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getShuffledQuestions(this.quizId).subscribe({
      next: (data: any) => {
        console.log({ data });
        this.questions = data;
        this.timer = this.questions.length * 1 * 60;
        this.startTimer();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getQuizId() {
    this.quizId = this.route.snapshot.params['quizId'];
  }
  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, 'null', location.href);
    });
  }
  submit() {
    Swal.fire({
      title: 'Do you want to submit?',
      icon: 'info',
      confirmButtonText: 'Submit',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmitted = true;
        this.evaluateQuiz();
      }
    });
  }

  startTimer() {
    let timeOut = setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateQuiz();
        clearInterval(timeOut);
        this.isSubmitted = true;
      } else if (this.isSubmitted == false) {
        this.timer--;
      }
    }, 1000);
  }

  getTime() {
    let m = Math.floor(this.timer / 60);
    let s = this.timer - m * 60;
    return `${m} : ${s}`;
  }

  evaluateQuiz() {
    this.questionService.evaluateQuiz(this.questions).subscribe({
      next: (data: any) => {
        console.log('evaluation: ', data);
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.marksGot = data.marksGot;
        this.isSubmitted = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  printPage() {
    window.print();
  }
}
