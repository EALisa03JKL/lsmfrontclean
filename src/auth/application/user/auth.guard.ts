import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserUseCaseService } from './auth-user-use-case.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authApiService = inject(AuthUserUseCaseService);
  const router = inject(Router);

  if (!authApiService.isLoggedIn()) {
    return router.navigate(['/login']);
  }

  return true;
};
