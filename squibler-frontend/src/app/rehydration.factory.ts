import { APP_INITIALIZER } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from './store/auth/auth.actions';
import { AuthService } from './services/auth.service';

export function rehydrateAuthState(store: Store): () => void {
  return () => {
    if (typeof window !== 'undefined') {
        const savedAuth = JSON.parse(localStorage.getItem('authState') || '{}');
        if (savedAuth.user && savedAuth.token) {
        store.dispatch(login({ user: savedAuth.user, token: savedAuth.token }));
        }
    }
    
  };
}
