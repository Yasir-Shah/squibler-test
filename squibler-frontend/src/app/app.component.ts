import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditorComponent } from './components/editor/editor.component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUser } from './store/auth/auth.selectors';
import { AppState } from './store/app.state';
import { User } from './types/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {

  user: Observable<User | null> = of(null);

  constructor(private router: Router, private store: Store<AppState>, private authService: AuthService  ) {
    this.user = this.store.select(selectUser);
  }


  ngOnInit(): void {
   
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);

  }
}

