import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-start-quiz',
  templateUrl: './pre-start-quiz.component.html',
  styleUrls: ['./pre-start-quiz.component.scss']
})
export class PreStartQuizComponent implements OnInit {

  constructor(private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router) { }

    quiz: any;
    quizId: any;

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
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

  startQuiz() {
    Swal.fire({
        title: 'Do you want to start the quiz?',
        icon: 'info',
        confirmButtonText: 'Start',
        showCancelButton: true
      })
      .then(
        (result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/start-quiz/' + this.quizId]);
          } else {
            return;
          }
        }
      )
    }

}
