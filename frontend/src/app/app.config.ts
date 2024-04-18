import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  
  providers: [provideRouter(routes),
  provideAnimations(),
  //  importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
  //  importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
  //  importProvidersFrom(provideAuth(() => getAuth())),
  //  importProvidersFrom(provideAnalytics(() => getAnalytics())), ScreenTrackingService, UserTrackingService,
  //  importProvidersFrom(provideFirestore(() => getFirestore()))
]
};
