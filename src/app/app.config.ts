import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { RoomRoutes } from './rooms/rooms.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteConfigToken } from './services/routeConfig.service';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { GlobalErrorHandler } from './errorhandler.service';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([requestInterceptor])), provideAnimationsAsync(),

    {
      provide: RouteConfigToken,
      useValue: {title: 'Home'},
    },
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};
