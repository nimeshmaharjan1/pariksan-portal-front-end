import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute, Router
} from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/services/category.service';
import {
  QuizService
} from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {

  quizId;
  quizFromApi;
  categories;

  constructor(private route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getQuizIdFromRoute();
    this.getSingleQuiz();
    this.getCategory();
  }

  getQuizIdFromRoute() {
    this.quizId = this.route.snapshot.params['quizId'];
  }
  getSingleQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.quizFromApi = data;
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      }
    })
  }
  getCategory() {
    this.categoryService.categories().subscribe(
      {
        next: (data:any) => {
          this.spinner.hide();
          this.categories = data;
        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);
          
        }
      }
    )
  }

  formSubmit() {
    this.spinner.show()
    this.quizService.updateQuiz(this.quizFromApi).subscribe(
      {
        next: (data:any) => {
          this.spinner.hide()
          Swal.fire('Success', 'Quiz has been successfully updated.', 'success').then(
            (ok) => {
              this.router.navigate(['/admin/quizzes'])
            }
          )
        },
        error: (err) => {
          this.spinner.hide()
          Swal.fire('Error', 'Something went wrong, please try again.', 'error');
          console.log(err);
          
        }
      }
    )
  }


}