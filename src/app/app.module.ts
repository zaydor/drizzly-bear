import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DrizzlyToolbarModule } from './drizzly-toolbar/drizzly-toolbar.module';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, DrizzlyToolbarModule],
  providers: [HttpClient, HttpClientModule, Geolocation, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HomePageModule, HomePage],
  bootstrap: [AppComponent],
})
export class AppModule { }
