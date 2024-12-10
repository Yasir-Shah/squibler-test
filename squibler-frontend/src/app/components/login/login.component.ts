import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private store: Store,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.httpService
  //       .post('user/login/', this.loginForm.value)
  //       .subscribe((response: any) => {
  //         this.authService.login(response.user, response.token);
  //         this.router.navigate(['/profile']);
  //       });
  //   }
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.httpService.post('user/login/', this.loginForm.value).subscribe((response: any) => {
        // Dispatch the login action with the user and token
        this.store.dispatch(login({ user: response.user, token: response.token }));
        this.authService.login(response.user, response.token);
        this.router.navigate(['/home/editor']);

      });
    }
  }
  
}
