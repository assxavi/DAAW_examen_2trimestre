import { Injectable, signal, computed } from '@angular/core';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth();

  // Estado (Angular signals)
  user = signal<User | null>(null);
  loading = signal(true);

  // Helpers
  isLoggedIn = computed(() => !!this.user());

  constructor() {
    // Escucha cambios de sesión (persistencia incluida por Firebase)
    onAuthStateChanged(this.auth, (u) => {
      this.user.set(u);
      this.loading.set(false);
    });
  }

  // Registro
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Logout
  logout() {
    return signOut(this.auth);
  }

  // JWT (ID Token) para tu backend (Spring/FastAPI)
  async getIdToken(): Promise<string | null> {
    const u = this.auth.currentUser;
    if (!u) return null;
    return u.getIdToken(); // JWT
  }
}