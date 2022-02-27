import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public getQuizzes(){
    return this.http.get(`${baseUrl}/quiz/`)
  }

  public addQuiz(quiz) {
    return this.http.post(`${baseUrl}/quiz/`, quiz)
  }

  public deleteQuiz(quizId) {
    return this.http.delete(`${baseUrl}/quiz/${quizId}`)
  }

  public getQuiz(categoryId) {
    return this.http.get(`${baseUrl}/quiz/${categoryId}`)
  }

  public updateQuiz(quiz) {
    return this.http.put(`${baseUrl}/quiz/`, quiz);
  }

  public getQuizzesOfCategory(categoryId) {
    return this.http.get(`${baseUrl}/quiz/category/${categoryId}`);
  }

  //GET ALL THE ACTIVE QUIZZES
  public getActiveQuizzes() {
    return this.http.get(`${baseUrl}/quiz/active-quizzes`);
  }

  public getActiveQuizzesOfCategory(categoryId) {
    return this.http.get(`${baseUrl}/quiz/category/active/${categoryId}`);
  }
}
