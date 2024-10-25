import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClient, provideHttpClient } from '@angular/common/http';

registerLocaleData(localePt);
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideEnvironmentNgxMask(), CurrencyPipe, { provide: LOCALE_ID, useValue: 'pt-BR' }, HttpClient, DatePipe, DecimalPipe, { provide: LOCALE_ID, useValue: 'pt-BR'}]
};
