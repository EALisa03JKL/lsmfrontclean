import { HttpInterceptorFn } from '@angular/common/http';
import { LocalKeys, LocalService } from '../services/locamManager/local.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = LocalService.getElement(LocalKeys.token);

  let headers = req.headers.set('Content-Type', 'application/json');

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({ headers });

  return next(authReq);
};
