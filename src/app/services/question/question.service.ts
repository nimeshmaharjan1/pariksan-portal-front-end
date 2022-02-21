import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  public getQuestionsofQuiz(quizId) {
    return this.http.get(`${baseUrl}/question/quiz/all/${quizId}`)
  }

  public addQuestion(question) {
    return this.http.post(`${baseUrl}/question/`, question);
  }
}
