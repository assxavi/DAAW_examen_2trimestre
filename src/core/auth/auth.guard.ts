import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si aún está cargando el estado, dejamos pasar y que el componente decida (simple)
  if (auth.loading()) return true;

  if (auth.isLoggedIn()) return true;

  router.navigateByUrl('/login');
  return false;
};