import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-pre-start-quiz',
  templateUrl: './pre-start-quiz.component.html',
  styleUrls: ['./pre-start-quiz.component.scss']
})
export class PreStartQuizComponent implements OnInit {

  constructor(private quizService: QuizService,
    private route: ActivatedRoute) { }

    quiz: any;
    quizId: any;

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    console.log(this.quizId);
    this.getQuiz();
  }
  getQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: (data:any) => {
        this.quiz = data;
        console.log('quiz:',data);
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
