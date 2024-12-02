import { InjectionToken, Provider } from '@angular/core';
import { AuthApiService } from '../auth-api.service';

export const HTTP_AUTH_SERVICE = new InjectionToken<AuthApiService>(
  'AuthApiService'
);

export const HTTP_AUTH_SERVICE_PROVIDER: Provider = {
  provide: HTTP_AUTH_SERVICE,
  useClass: AuthApiService,
};
