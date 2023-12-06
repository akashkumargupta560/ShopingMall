import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  let userData = localStorage.getItem('user');
  if (userData) {
    inject(Router).navigate(['/dashboard'])
    return false;
  }
  return true;
};
