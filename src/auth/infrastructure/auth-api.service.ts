import { inject, Injectable } from '@angular/core';
import { AuthApi } from './auth-api.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map, Observable, pipe, tap } from 'rxjs';
import {
  AuthData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  UpdateResponse,
  UpdateUser,
} from './models/auth-api.models';
import {
  LocalKeys,
  LocalManagerService,
} from '../../shared/LocalManager/storage.servicee';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthApi {
  private _httpClient = inject(HttpClient);
  private readonly URL_AUTH = environment.URL_AUTH;
  private readonly AuthEndpoints = {
    login: '/login',
    logout: '/logout',
    register: '/register',
    update: '/update',
  };

  public login(user: AuthData): Observable<LoginResponse> {
    const { email, password } = user;
    return this._httpClient
      .post<LoginResponse>(`${this.URL_AUTH}${this.AuthEndpoints.login}`, {
        email,
        password,
      })
      .pipe(
        map((result) => {
          if (result.token) {
            LocalManagerService.setElement(LocalKeys.token, result.token);
          }
          LocalManagerService.setElement(LocalKeys.email, result.email);
          LocalManagerService.setElement(LocalKeys.name, result.name);
          return result;
        })
      );
  }

  logout() {
    LocalManagerService.clearStorage();

  }

  register(
    user: RegisterData
    // confirmPassword: string
  ): Observable<RegisterResponse> {
    const { name, email, password } = user;

    return this._httpClient
      .post<RegisterResponse>(
        `${this.URL_AUTH}${this.AuthEndpoints.register}`,
        {
          email,
          password,
          name,
          // confirmPassword,
        }
      )
      .pipe(
        map((result) => {
          if (result.token) {
            LocalManagerService.setElement(LocalKeys.token, result.token);
          }
          LocalManagerService.setElement(LocalKeys.email, result.email);
          LocalManagerService.setElement(LocalKeys.name, result.name);
          return result;
        })
      );
  }

  update(id: UpdateUser): Observable<UpdateResponse> {
    return this._httpClient.post<UpdateResponse>(
      `${this.URL_AUTH}${this.AuthEndpoints.update}`,
      {
        id,
      }
    );
  }

  isLoggedIn() {
    return LocalManagerService.getElement(LocalKeys.token) !== null;
  }
}
