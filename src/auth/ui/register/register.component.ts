import { Component, inject } from '@angular/core';
import { AuthService } from '../../../app/services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

interface RegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup<RegisterForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  async onSumbit() {
    console.log(this.registerForm.getRawValue());
    if (this.registerForm.valid) {
      try {
        await firstValueFrom(
          this.authService.register(this.registerForm.getRawValue())
        );
        // en caso de que el registro sea exitoso, se redirige al usuario a la página de login
        // in case of successful registration, the user is redirected to the login page
        this.router.navigate(['/login']);
      } catch (error) {
        console.error(error);
      }

      this.registerForm.reset();
    }
  }
}
