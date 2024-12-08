import { Observable } from 'rxjs';
import {
  RegisterData,
  AuthData,
  RegisterResponse,
  LoginResponse,
  UpdateResponse,
  UpdateUser,
} from './models/auth-api.models';
export interface AuthApi {
  login: (user: AuthData) => Observable<LoginResponse>;
  logout: () => void;
  register: (user: RegisterData) => Observable<RegisterResponse>;

  update: (id: UpdateUser) => Observable<UpdateResponse>;
}
