import { inject, Injectable } from '@angular/core';
import { AuthApi } from './auth-api.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  AuthUser,
  AuthUserLogin,
  AuthUserRegister,
} from '../domain/user.model';

@Injectable()
export class AuthApiService implements AuthApi {
  private _httpClient = inject(HttpClient);
  private readonly URL_AUTH = environment.URL_AUTH;
  private readonly AuthEndpoints = {
    login: '/login',
    logout: '/logout',
    register: '/register',
    update: '/update',
  };

  login(email: string, password: string): Observable<AuthUserLogin> {
    return this._httpClient.post<AuthUserLogin>(
      `${this.URL_AUTH}${this.AuthEndpoints.login}`,
      {
        email,
        password,
      }
    );
  }

  logout(): Promise<void> {
    return this._httpClient
      .post<void>(`${this.URL_AUTH}${this.AuthEndpoints.logout}`, {})
      .toPromise();
  }

  register(
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<AuthUserRegister> {
    return this._httpClient.post<AuthUserRegister>(
      `${this.URL_AUTH}${this.AuthEndpoints.register}`,
      {
        email,
        password,
        confirmPassword,
      }
    );
  }

  update(email: string, password: string): Observable<AuthUser> {
    return this._httpClient.post<AuthUserRegister>(
      `${this.URL_AUTH}${this.AuthEndpoints.update}`,
      {
        email,
        password,
      }
    );
  }
}
