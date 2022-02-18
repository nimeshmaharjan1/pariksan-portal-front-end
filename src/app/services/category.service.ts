import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //LOAD CATEGORIES
  public categories() {
    return this.http.get(`${baseUrl}/category/`);
  }

  //ADD CATEGORY
  public addCategory(category){
    return this.http.post(`${baseUrl}/category/`, category);
  }

  //DELETE CATEGORY
  public deleteCategory(categoryId) {
    return this.http.delete(`${baseUrl}/category/${categoryId}`);
  }

  public updateCategory(category) {
    return this.http.put(`${baseUrl}/category/`, category);
  }

  public getCategory(quizId) {
    return this.http.get(`${baseUrl}/category/${quizId}`);
  }
}
