import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    
  ]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    //private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { password, confirm_password } = this.signupForm.value;
      if (password !== confirm_password) {
        alert('Passwords do not match!');
        return;
      }
      this.httpService
        .post('user/signup/', this.signupForm.value)
        .subscribe((response: any) => {
         // this.authService.login(response.user, response.token);
          this.router.navigate(['/profile']);
        });
    }
  }
}
