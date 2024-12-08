import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthUserUseCaseService } from '../../application/user/auth-user-use-case.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  authService = inject(AuthUserUseCaseService);
  router = inject(Router);

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  errorMessage: string | null = null;

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        await firstValueFrom(
          this.authService.login(this.loginForm.getRawValue())
        );
        // on login success
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        if (error instanceof HttpErrorResponse) {
          // Handle HTTP errors
          if (error.status === 401) {
            this.errorMessage =
              'Credenciales incorrectas. Por favor, intenta de nuevo.';
          } else {
            this.errorMessage =
              'Ocurrió un error en el servidor. Por favor, intenta más tarde.';
          }
        } else {
          // Handle other types of errors
          this.errorMessage =
            'Ocurrió un error desconocido. Por favor, intenta más tarde.';
        }
        // console.error(error);
      }

      this.loginForm.reset();
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
