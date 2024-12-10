import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../services/http.service';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selectors';
import { AppState } from '../../store/app.state';
import { User } from '../../types/user';
import { AuthService } from '../../services/auth.service';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  profileForm!: FormGroup; // Non-null assertion
  user: Observable<User | null> = of(null);

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private store: Store<AppState>, 
    private authService: AuthService 
  ) {
    this.user = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.user.subscribe(user => {
      this.profileForm = this.fb.group({
        first_name: [user?.first_name, [Validators.required]],
        last_name: [user?.last_name, [Validators.required]],
        email: [user?.email, [Validators.required, Validators.email]],
      });
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.httpService
        .patch('user/profile/', this.profileForm.value)
        .subscribe((response: any) => {
          console.log(response);
          if(response.user) {
            this.store.dispatch(login({ user: response.user, token: this.authService.getToken() }));
            this.authService.updateUSer(response.user);
          }

        });
    }
  }
}

