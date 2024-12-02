import { LoginResponse } from './../../domain/auth.model';
export const AuthAdapter = (loginResponse: LoginResponse): string =>
  loginResponse.token;
