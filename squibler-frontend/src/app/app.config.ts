import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { provideHttpClient, withFetch, withInterceptors   } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { provideStore } from '@ngrx/store';
import { metaReducers } from './store/meta.reducer';
import { Store } from '@ngrx/store';
import { APP_INITIALIZER } from '@angular/core';
import { rehydrateAuthState } from './rehydration.factory';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from "../environments/environments";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: rehydrateAuthState,
      deps: [Store],
      multi: true,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]) ),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore({ auth: authReducer }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    importProvidersFrom(
      BrowserAnimationsModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      NgxSkeletonLoaderModule,
      StoreModule.forRoot(
        { auth: authReducer },
        { metaReducers }
      )
    ),
    //StoreDevtoolsModule.instrument(), // Optional for debugging purposes
    RouterModule,
    {
      provide: QuillModule,
      useValue: QuillModule.forRoot(),
    },
  ],
};
