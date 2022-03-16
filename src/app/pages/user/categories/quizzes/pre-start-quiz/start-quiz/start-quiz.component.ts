import { NgxSpinnerService } from 'ngx-spinner';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NbDialogService,
  NbSpinnerComponent,
  NbSpinnerService,
} from '@nebular/theme';
import { TimeoutError } from 'rxjs';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { SelectDifficultyComponent } from './select-difficulty/select-difficulty.component';

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
  wrongAnswers: any;
  isSubmitted: boolean = false;
  timer: any;
  time: any;
  showQuestionsComponent = false;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private dialogService: NbDialogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.open();
    this.getQuizId();
    this.preventBackButton();
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getShuffledQuestions(this.quizId).subscribe({
      next: (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 1 * 60;
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

  async startTimer() {
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
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.marksGot = data.marksGot;
        this.wrongAnswers = data.wrongAnswers;
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
  open() {
    this.dialogService.open(DifficultyComponent).onClose.subscribe({
      next: (data) => {
        console.log(data);
        this.showQuestionsComponent = true;
        this.startTimer();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
