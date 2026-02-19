import { Routes } from '@angular/router';

import { authGuard } from '../core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/admin').then(m => m.AdminComponent),
  },

  { path: '**', redirectTo: 'login' },
];
