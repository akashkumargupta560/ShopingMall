import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let userData = localStorage.getItem('user');
  if (userData) {
    return true;
  }
  inject(Router).navigate(['/login'])
  return false;
};
