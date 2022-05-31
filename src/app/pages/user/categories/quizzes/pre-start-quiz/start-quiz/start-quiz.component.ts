import { BestScoreService } from './../../../../../../services/dashboard/best-score/best-score.service';
import { AttemptsService } from './../../../../../../services/dashboard/attempts/attempts.service';
import { UserQuizService } from './../../../../../../services/User-quiz/user-quiz.service';
import { ObjectUtil } from './../../../../../../services/ObjectUtil';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NbDialogService,
  NbSpinnerComponent,
  NbSpinnerService,
} from '@nebular/theme';
import { TimeoutError, map, filter } from 'rxjs';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { DifficultyComponent } from './difficulty/difficulty.component';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss'],
})
export class StartQuizComponent implements OnInit {
  quizId: any;
  questions: any;
  attempted = 0;
  marksGot = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  isSubmitted: boolean = false;
  timer: any;
  time: any;
  showQuestionsComponent = false;
  choosenDifficultyLevel: any;
  levelOneQuestions = [];
  levelTwoQuestions = [];
  levelThreeQuestions = [];
  noLevelOneQuestions = false;
  noLevelTwoQuestions = false;
  noLevelThreeQuestions = false;
  percentage;
  grade;
  value;
  color;
  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private dialogService: NbDialogService,
    private spinner: NgxSpinnerService,
    private userQuizService: UserQuizService,
    private attemptService: AttemptsService,
    private bestScore: BestScoreService
  ) {}

  ngOnInit() {
    this.open();
    this.getQuizId();
    this.preventBackButton();
  }
  async getQuestions() {
    this.questionService.getShuffledQuestions(this.quizId).subscribe({
      next: async (data: any) => {
        this.questions = await data;
        this.levelOneQuestions = await this.questions.filter(
          (x: { difficultyLevel: number }) => x.difficultyLevel == 1
        );
        this.levelTwoQuestions = await this.questions.filter(
          (x: { difficultyLevel: number }) => x.difficultyLevel == 2
        );
        this.levelThreeQuestions = await this.questions.filter(
          (x: { difficultyLevel: number }) => x.difficultyLevel == 3
        );
        if (this.choosenDifficultyLevel == 1) {
          this.timer = this.levelOneQuestions.length * 1 * 60;
          this.startTimer();
        } else if (this.choosenDifficultyLevel == 2) {
          this.timer = this.levelTwoQuestions.length * 1 * 60;
          this.startTimer();
        } else if (this.choosenDifficultyLevel == 3) {
          this.timer = this.levelThreeQuestions.length * 1 * 60;
          this.startTimer();
        }
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
        this.userQuizService.attempts++;
        this.isSubmitted = true;
        this.evaluateQuiz();
        this.attemptService.attempts++;
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
    if (this.choosenDifficultyLevel == 1) {
      for (let x of this.levelOneQuestions) {
        if (x.answer == x.givenAnswer) {
          this.correctAnswers++;
          let singleMarks =
            this.levelOneQuestions[0].quiz.maxMarks /
            this.levelOneQuestions.length;
          this.marksGot += singleMarks;
          this.percentage = (this.marksGot / x.quiz.maxMarks) * 100;
          console.log('X quiz ', x.quiz);
          if (this.percentage >= 80) {
            this.grade = 'A+';
            this.value = 100;
            this.color = 'primary';
          } else if (this.percentage >= 60 && this.percentage <= 80) {
            this.grade = 'B+';
            this.value = 60;
            this.color = 'accent';
          } else if (this.percentage <= 60) {
            this.grade = 'C';
            this.value = 40;
            this.color = 'warn';
          }
          console.log(this.grade);
          this.bestScore.score = this.grade;
        } else {
          this.wrongAnswers++;
        }
        if (!ObjectUtil.isEmpty(x.givenAnswer)) {
          this.attempted++;
        }
      }
    }
    if (this.choosenDifficultyLevel == 2) {
      for (let x of this.levelTwoQuestions) {
        if (x.answer == x.givenAnswer) {
          this.correctAnswers++;
          let singleMarks =
            this.levelTwoQuestions[0].quiz.maxMarks /
            this.levelTwoQuestions.length;
          this.marksGot += singleMarks;
          this.percentage = (this.marksGot / x.quiz.maxMarks) * 100;
        } else {
          this.wrongAnswers++;
        }
        if (!ObjectUtil.isEmpty(x.givenAnswer)) {
          this.attempted++;
        }
      }
      if (this.percentage >= 80) {
        this.grade = 'A+';
        this.value = 100;
        this.color = 'primary';
      } else if (this.percentage >= 60 && this.percentage <= 80) {
        this.grade = 'B+';
        this.value = 60;
        this.color = 'accent';
      } else if (this.percentage >= 40 && this.percentage <= 60) {
        this.grade = 'C';
        this.value = 40;
        this.color = 'warn';
      }
    }
    if (this.choosenDifficultyLevel == 3) {
      for (let x of this.levelThreeQuestions) {
        if (x.answer == x.givenAnswer) {
          this.correctAnswers++;
          let singleMarks =
            this.levelThreeQuestions[0].quiz.maxMarks /
            this.levelThreeQuestions.length;
          this.marksGot += singleMarks;
          this.percentage = (this.marksGot / x.quiz.maxMarks) * 100;
        } else {
          this.wrongAnswers++;
        }
        if (!ObjectUtil.isEmpty(x.givenAnswer)) {
          this.attempted++;
        }
      }
      if (this.percentage >= 80) {
        this.grade = 'A+';
        this.value = 100;
        this.color = 'primary';
      } else if (this.percentage >= 60 && this.percentage <= 80) {
        this.grade = 'B+';
        this.value = 60;
        this.color = 'accent';
      } else if (this.percentage >= 40 && this.percentage <= 60) {
        this.grade = 'C';
        this.value = 40;
        this.color = 'warn';
      }
    }
  }
  printPage() {
    window.print();
  }
  open() {
    this.dialogService.open(DifficultyComponent).onClose.subscribe({
      next: (data) => {
        this.choosenDifficultyLevel = data;
        this.showQuestionsComponent = true;
        this.getQuestions();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  isQuestionsEmpty() {
    if (this.choosenDifficultyLevel == 1) {
      if (this.levelOneQuestions.length < 1) {
        this.noLevelOneQuestions = true;
        this.isSubmitted = true;
        this.evaluateQuiz();
      }
    } else if (this.choosenDifficultyLevel == 2) {
      if (this.levelTwoQuestions.length < 1) {
        this.noLevelTwoQuestions = true;
        this.isSubmitted = true;
        this.evaluateQuiz();
      }
    } else if (this.choosenDifficultyLevel == 3) {
      if (this.levelThreeQuestions.length < 1) {
        this.noLevelThreeQuestions = true;
        this.isSubmitted = true;
        this.evaluateQuiz();
      }
    }
  }
}
