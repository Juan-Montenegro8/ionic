import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, PreloadingStrategy  } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { NotificacionService } from './services/notificacion.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},FingerprintAIO,AndroidPermissions,Device,NotificacionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
