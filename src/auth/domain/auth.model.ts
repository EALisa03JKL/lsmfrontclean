interface TokenContainer {
  token: string;
}

export interface LoginResponse extends TokenContainer {}

export interface Auth extends TokenContainer {}

export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData extends AuthData {
  confirmPassword: string;
}
