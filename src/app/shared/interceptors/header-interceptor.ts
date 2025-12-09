import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  if (req.url.includes('/auth/check-status')) {
    return next(reqWithHeader);
  }
  return next(req);
};
