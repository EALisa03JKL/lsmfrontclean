import { Inject, Injectable } from '@angular/core';
import { HTTP_AUTH_SERVICE } from '../../infrastructure/providers/auth-api.provider';
import { AuthApiService } from '../../infrastructure/auth-api.service';
import { Observable } from 'rxjs';
import { AuthUserLogin, AuthUserRegister } from '../../domain/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthUserUseCaseService {
  constructor(
    @Inject(HTTP_AUTH_SERVICE) private _authApiService: AuthApiService
  ) {}

  login(email: string, password: string): Observable<AuthUserLogin> {
    return this._authApiService.login(email, password);
  }

  logout() {
    console.log('logout');
  }

  register(
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<AuthUserRegister> {
    return this._authApiService.register(email, password, confirmPassword);
  }

  update() {
    console.log('update');
  }
}
