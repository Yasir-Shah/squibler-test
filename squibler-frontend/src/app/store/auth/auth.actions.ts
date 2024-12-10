import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ user: any; token: string | null}>()
);

export const logout = createAction('[Auth] Logout');
