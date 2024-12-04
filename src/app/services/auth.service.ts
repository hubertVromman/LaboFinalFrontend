import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environment';
import { LoginForm } from '../models/login-form.model';
import { RegisterForm } from '../models/register-form.model';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiUrl;
  get isConnected() {
    return localStorage.getItem("accessToken") != null
  };
  isConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected);
  mustOpenLogin: Subject<boolean> = new Subject<boolean>();
  mustOpenRegister: Subject<boolean> = new Subject<boolean>();

  constructor(private _client: HttpClient, private _router: Router) {}

  storeToken(tokens: Token) {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    this.isConnectedSubject.next(this.isConnected);
  }

  login(loginForm: LoginForm) {
    this._client.post<Token>(`${this.url}/User/Login`, loginForm).subscribe({
      next : (data) => {
        this.storeToken(data)
      }
    });
  }

  register(registerForm: RegisterForm) {
    this._client.post(`${this.url}/User/Register`, registerForm).subscribe({
      next : () => {
        this.login({
          email: registerForm.email,
          password: registerForm.password,
        });
      }
    });
  }

  checkEmail(email: string) {
    return this._client.head(`${this.url}/User/CheckEmail/${email}`);
  }

  refreshTokens() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    let tokens = {
      accessToken,
      refreshToken
    }
    return this._client.post<Token>(`${this.url}/User/RefreshToken`, tokens).pipe(
      tap((data) => {
        this.storeToken(data)
      })
    );
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.isConnectedSubject.next(this.isConnected);
    this._router.navigate(["home"]);
  }

  getProfile() : Observable<User> {
      // if (!this.isConnected)
      //   return
      return this._client.get<User>(`${this.url}/User/Profile`)
  }

  openLogin() {
    this.mustOpenLogin.next(true);
  }

  openRegister() {
    this.mustOpenRegister.next(true);
  }
}
