import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  //GENERATE TOKEN
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //Login User: set token in local storage
  public loginUser(token){
    localStorage.setItem('token', token);
    return true;
  }

  //User is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr === undefined || tokenStr === '' || tokenStr === null) {
      return false;
    } else {
      return true;
    }
  }

  //LOGOUT : remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //GET TOKEN
  public getToken(){
    return localStorage.getItem('token');
  }

  //set user details in local storage
  public setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Get user detail
  public getUser(){
    let userStr = localStorage.getItem('user');
    if (userStr !== null) {
      return JSON.parse(userStr);
    } else {
      this.logout;
      return null;
    }
  }

  //Get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get('${baseUrl}/current-user')
  }
}
