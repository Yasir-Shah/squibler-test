import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export interface AuthState {
  user: any | null;
  token: string | null;
}

let savedAuth = { user: null, token: null };
if (typeof window !== 'undefined') {
  const storedAuth = localStorage.getItem('authState');
  if (storedAuth) {
    savedAuth = JSON.parse(storedAuth);
  }
}

const initialState: AuthState = {
  user: savedAuth.user || null,
  token: savedAuth.token || null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user, token }) => {
    const newState = { ...state, user, token };
    if (typeof window !== 'undefined') {
        localStorage.setItem('authState', JSON.stringify(newState));
      }
    return newState;
  }),
  on(logout, (state) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authState');
      }
    return { ...state, user: null, token: null };
  })
);
