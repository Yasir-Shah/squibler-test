import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Assuming you have an AuthService for user authentication

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userRole = this.authService.getUserRole();
        
        const allowedRoles = route.data['roles'] as Array<string>;

        if (userRole==='Admin' || userRole==='Editor') {
            return true;
        }

        this.router.navigate(['/home/editor']);
        return false;
    }
}
