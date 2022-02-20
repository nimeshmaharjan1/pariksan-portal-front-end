import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {

  quizIdFromUrl;
  quizTitle;
  question = {  
    quiz: {

    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.quizIdFromUrl = this.route.snapshot.params['quizId'];
    this.quizTitle = this.route.snapshot.params['title'];
    console.log(
      this.quizTitle
    );
    
    this.question.quiz['quizId'] = this.quizIdFromUrl;
  }

}
