import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'authUser';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  // Check if running in a browser
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Save user and token
  login(user: any, token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  updateUSer(user: any) {
    if (this.isBrowser()) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  // Logout and clear storage
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem('authState')
    }
  }

  // Get stored token
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Get stored user
  getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getUserRole(): string | null {
    if (this.isBrowser()) {
      let user = localStorage.getItem(this.USER_KEY);
      const parsedUser: User | null =  user ? JSON.parse(user) : null;
      return parsedUser?.role || null
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
