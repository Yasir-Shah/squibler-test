import { ActionReducer, MetaReducer } from '@ngrx/store';

export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);

    if (nextState.auth && typeof window !== 'undefined') {
      localStorage.setItem('authState', JSON.stringify(nextState.auth));
    }

    return nextState;
  };
}

export const metaReducers: MetaReducer[] = [localStorageMetaReducer];
