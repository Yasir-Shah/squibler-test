import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Use Angular's `inject` function to access services

  if (authService.isAuthenticated()) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Token ${authService.getToken()}`),
    });
    return next(clonedRequest);
  }

  return next(req);
};
