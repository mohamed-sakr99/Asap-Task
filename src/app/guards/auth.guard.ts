import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    if (state.url === '/login') {
      router.navigateByUrl('/home'); // Redirect logged-in users away from login
      return false;
    }
    return true; // Allow navigation if logged in
  }

  // If no token and trying to access a protected route, redirect to login
  if (state.url !== '/login') {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
