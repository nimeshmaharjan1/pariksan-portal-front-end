import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [
    {
    quizId: 20,
    title: 'Basic Java Programming',
    description: 'Quiz for basic Java Core Syntax.',
    maxMarks: '50',
    numberOfQuestions: '20',
    active: '',
    category: {
      title: 'Programming'
    }
  },
  {
    quizId: 21,
    title: 'Basic Java Programming',
    description: 'Quiz for basic Java Core Syntax.',
    maxMarks: '50',
    numberOfQuestions: '20',
    active: '',
    category: {
      title: 'Programming'
    }
  },
]
  constructor() { }

  ngOnInit(): void {
    
  }

}
