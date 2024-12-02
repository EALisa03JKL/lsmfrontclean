import { Observable } from 'rxjs';
import {
  AuthUserRegister,
  AuthUserLogin,
  AuthUser,
} from '../domain/user.model';
export interface AuthApi {
  login: (email: string, password: string) => Observable<AuthUserLogin>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Observable<AuthUserRegister>;

  update: (name: string, email: string) => Observable<AuthUser>;
}
