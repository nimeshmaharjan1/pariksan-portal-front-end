import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import {
  CategoryService
} from 'src/app/services/category.service';
import {
  QuizService
} from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [];
  categories = [];
  public flipped;

  addQuizForm = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      categoryId: ''
    }
  }

  constructor(private quizzesService: QuizService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.quizzesService.getQuizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        Swal.fire('Success', 'Quizzes have been successfully fetched.', 'success')
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Error', 'Quizzes could not be fetched.', 'info')

      }
    })
    this.categoryService.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
  toggleFlip() {
    this.flipped = !this.flipped;
  }

  addQuiz() {
    if (this.addQuizForm.title === '') {
      Swal.fire('Error','Title cannot be blank.','error');
      return;
    }
    if (this.addQuizForm.description === '' || this.addQuizForm.maxMarks === '') {
      Swal.fire('Error','Fields cannot be blank.','error');
      return;
    }
    if (this.addQuizForm.category === null) {
      Swal.fire('Error','Category cannot be empty.','error');
      return;
    }
    this.quizzesService.addQuiz(this.addQuizForm).subscribe(
      {
        next: (data:any) => {
          Swal.fire('Success','Quiz has been successfully added.','success');
          setTimeout(() => {
            location.reload();
          }, 3000)
        },
        error: (err) => {
          Swal.fire('Error','Something went wrong, please try again.','error');
        }
      }
    )
    
  }


}