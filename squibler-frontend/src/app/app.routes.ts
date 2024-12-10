import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditorComponent } from './components/editor/editor.component';
import { StatsComponent } from './components/stats/stats.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginGuard } from './services/login-guard.service';
import { RoleGuard } from './services/role-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'signup', component: SignupComponent },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'editor', component: EditorComponent },
            { 
                path: 'stats', 
                component: StatsComponent, 
                canActivate: [RoleGuard], 
                data: { roles: ['Admin', 'Editor'] } 
            },
            { path: 'profile', component: ProfileComponent }
        ]
    }
];
