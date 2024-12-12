import { registerLocaleData } from '@angular/common';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { dateInterceptor } from './interceptors/date.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([dateInterceptor, tokenInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: definePreset(Aura, {
              semantic: {
                  primary: {
                      50: '{sky.50}',
                      100: '{sky.100}',
                      200: '{sky.200}',
                      300: '{sky.300}',
                      400: '{sky.400}',
                      500: '{sky.500}',
                      600: '{sky.600}',
                      700: '{sky.700}',
                      800: '{sky.800}',
                      900: '{sky.900}',
                      950: '{sky.950}'
                  }
              }
          })
        }
    }),
    { provide: LOCALE_ID, useValue: 'fr-BE' },
  ]
};
