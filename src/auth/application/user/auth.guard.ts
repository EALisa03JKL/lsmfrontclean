import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserUseCaseService } from './auth-user-use-case.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authApiService = Inject(AuthUserUseCaseService);
  const router = Inject(Router);

  if (authApiService.isLogged()) {
    return router.navigate(['/login']);
  }

  return true;
};
