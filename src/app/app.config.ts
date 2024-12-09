import { registerLocaleData } from '@angular/common';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { dateInterceptor } from './interceptors/date.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([dateInterceptor, tokenInterceptor])),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'fr-BE' },
  ]
};
