import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
})
export class AddQuestionsComponent implements OnInit {
  quizIdFromUrl;
  quizTitle;
  question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    difficultyLevel: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizIdFromUrl = this.route.snapshot.params['quizId'];
    this.quizTitle = this.route.snapshot.params['title'];

    this.question.quiz['quizId'] = this.quizIdFromUrl;
  }
  formSubmit() {
    if (
      this.question.content.trim() === '' ||
      this.question.option1 === '' ||
      this.question.option2 === '' ||
      this.question.answer === ''
    ) {
      Swal.fire('Error', 'Fields cannot be blank', 'info');
      return;
    }
    this.questionService.addQuestion(this.question).subscribe({
      next: (data: any) => {
        Swal.fire(
          'Question has been successfully added.',
          'Please continue to add another one',
          'success'
        );
        console.log('successful');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goBack() {
    this.router.navigate([
      `admin/view-question/${this.quizIdFromUrl}/${this.quizTitle}`,
    ]);
  }
}
