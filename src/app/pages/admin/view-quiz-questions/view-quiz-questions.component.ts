import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';

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
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this.quizTitle = this.route.snapshot.params['title'];
    this.getQuestion();
  }
  getQuestion() {
    this.questionService.getQuestionsofQuiz(this.quizId).subscribe(
      {
        next: (data:any) => {
          this.questions = data;
          console.log(data);
          
        },
        error: (err) => {
          console.log(err);
          
        }
      }
    )
  }
  showAns() {
    this.showAnswer = !this.showAnswer;
  }
}
