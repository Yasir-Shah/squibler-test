import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selectors';
import { AppState } from '../../store/app.state';
import { User } from '../../types/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,    
  ]
})
export class HomeComponent implements OnInit {

  user: Observable<User | null> = of(null);

  constructor(private router: Router, private store: Store<AppState>, private authService: AuthService  ) {
    this.user = this.store.select(selectUser);
  }


  ngOnInit(): void {
   
  }

  // Logout function
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);

  }
}
