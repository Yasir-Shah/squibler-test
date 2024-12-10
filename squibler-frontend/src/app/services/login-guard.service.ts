import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service'; // Assume you have an AuthService that checks for session
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // If logged in, redirect to home
      this.router.navigate(['/home/editor/']);
      return false;
    }
    // If not logged in, allow to access login page
    return true;
  }
}
