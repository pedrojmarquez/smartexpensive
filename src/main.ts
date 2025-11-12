import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
// import {AuthInterceptor} from './app/interceptors/auth.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { importProvidersFrom } from '@angular/core';



bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // 👇 Ionic Storage
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__smartexpensive',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      })
    ),

    // 👇 Necesario para interceptores en apps standalone
    provideHttpClient(withInterceptorsFromDi()),
    // 👇 Registramos tu interceptor clásico
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
});
