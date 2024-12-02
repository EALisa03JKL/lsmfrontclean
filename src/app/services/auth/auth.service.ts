import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  AuthData,
  LoginResponse,
  RegisterData,
} from '../../../auth/domain/auth.model';
import { map, Observable } from 'rxjs';
import { AuthAdapter } from '../../../auth/infrastructure/adapter/auth,adapter';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL_AUTH = environment.URL_AUTH;
  private _httpClient = inject(HttpClient);
  private readonly AuthEndpoints = {
    login: '/login',
    logout: '/logout',
    register: '/register',
    update: '/update',
  };

  login(user: AuthData): Observable<string> {
    return this._httpClient
      .post<LoginResponse>(`${this.URL_AUTH}${this.AuthEndpoints.login}`, user)
      .pipe(map(AuthAdapter));
  }

  register(user: RegisterData): Observable<void> {
    return this._httpClient.post<void>(
      `${this.URL_AUTH}${this.AuthEndpoints.register}`,
      user
    );
  }
}
