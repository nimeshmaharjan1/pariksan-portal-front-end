import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  public getQuestionsOfQuiz(quizId) {
    return this.http.get(`${baseUrl}/question/quiz/all/${quizId}`)
  }
  public getQuestion(questionId) {
    return this.http.get(`${baseUrl}/question/${questionId}`)
  }

  public addQuestion(question) {
    return this.http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId) {
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  public updateQuestion(question) {
    return this.http.put(`${baseUrl}/question/`, question);
  }
}
