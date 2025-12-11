import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  await firstValueFrom(authService.checkStatus());
  if (!authService.isAdmin()) {
    router.navigateByUrl('/');
  }
  return authService.isAdmin();
};
