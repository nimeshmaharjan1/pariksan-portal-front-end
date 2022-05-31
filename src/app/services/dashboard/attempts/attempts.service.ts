import { LoginService } from './../../login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttemptsService {
  attempts = 0;
  constructor(private loginService: LoginService) {}
}
