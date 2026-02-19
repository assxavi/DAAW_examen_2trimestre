import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  token = '';

  async showToken() {
    this.token = (await this.auth.getIdToken()) ?? '';
  }

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
