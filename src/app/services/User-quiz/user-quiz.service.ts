import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserQuizService {
  attempts = 0;
  constructor() {}
}
