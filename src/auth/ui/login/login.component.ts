import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../app/services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

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
  authService = inject(AuthService);

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

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        await firstValueFrom(
          this.authService.login(this.loginForm.getRawValue())
        );
      } catch (error) {
        console.error(error);
      }

      this.loginForm.reset();
    }
  }
}
