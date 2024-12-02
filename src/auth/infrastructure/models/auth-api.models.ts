export interface AuthUser {
  readonly name: string;
  readonly email: string;
}

export interface AuthUserLogin extends AuthUser {
  readonly password: string;
}

export interface AuthUserRegister extends AuthUser {
  readonly password: string;
  readonly confirmPassword: string;
}
