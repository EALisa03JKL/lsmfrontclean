export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthUserLogin extends AuthUser {
  password: string;
}

export interface AuthUserRegister extends AuthUser {
  password: string;
  confirmPassword: string;
}
