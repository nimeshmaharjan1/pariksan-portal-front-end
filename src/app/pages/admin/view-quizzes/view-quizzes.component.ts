import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = []
public flipped;

  constructor(private quizzesService: QuizService) { }

  ngOnInit(): void {
    this.quizzesService.getQuizzes().subscribe(
      {
        next: (data:any) => {
          this.quizzes = data;
          Swal.fire('Success','Quizzes have been successfully fetched.','success')
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error','Quizzes could not be fetched.','info')
          
        }
      }
    )
    
  }
toggleFlip(){
  this.flipped = !this.flipped;
}


}
