import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CategoryService
} from 'src/app/services/category.service';
import {
  QuizService
} from 'src/app/services/quiz.service';
import {
  SwalService
} from 'src/app/services/swal-service/swal.service';
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
    private categoryService: CategoryService,
    private swalService: SwalService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.quizzesService.getQuizzes().subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.quizzes = data;
        Swal.fire('Success', 'Quizzes have been successfully fetched.', 'success')
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
        Swal.fire('Error', 'Quizzes could not be fetched.', 'info')

      }
    })
    this.categoryService.categories().subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.categories = data;
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      }
    })

  }
  toggleFlip() {
    this.flipped = !this.flipped;
  }

  addQuiz() {
    this.spinner.show();
    if (this.addQuizForm.title === '') {
      this.spinner.hide();
      Swal.fire('Error', 'Title cannot be blank.', 'error');
      return;
    }
    if (this.addQuizForm.description === '' || this.addQuizForm.maxMarks === '') {
      this.spinner.hide();
      Swal.fire('Error', 'Fields cannot be blank.', 'error');
      return;
    }
    if (this.addQuizForm.category === null) {
      this.spinner.hide();
      Swal.fire('Error', 'Category cannot be empty.', 'error');
      return;
    }
    this.quizzesService.addQuiz(this.addQuizForm).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        Swal.fire('Success', 'Quiz has been successfully added.', 'success').then(
          (e) => {
            location.reload();
          }
        )
      },
      error: (err) => {
        this.spinner.hide();
        Swal.fire('Error', 'Something went wrong, please try again.', 'error');
      }
    })

  }

  deleteQuiz(quizId) {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'info',
        confirmButtonText: 'Delete',
        showCancelButton: true
      })
      .then(
        (result) => {
          this.spinner.show();
          if (result.isConfirmed) {
            //if Deleted
            this.quizzesService.deleteQuiz(quizId).subscribe({
              next: (data: any) => {
                this.spinner.hide();
                this.quizzes = this.quizzes.filter(
                  (quiz) => quiz.quizId !== quizId
                );
                // this.swalService.swalConfirmMethod('Are you sure?', 'info', 'Delete', true );
              },
              error: (err) => {
                this.spinner.hide();
                Swal.fire('Error', 'Something went wrong, please try again.', 'error');
                console.log(err);
              }
            })
          }
        }
      )
  }

}