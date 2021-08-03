import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherInfoPageRoutingModule } from './weather-info-routing.module';

import { WeatherInfoPage } from './weather-info.page';
import { DrizzlyToolbarModule } from '../drizzly-toolbar/drizzly-toolbar.module';
import { HomePageModule } from '../home/home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherInfoPageRoutingModule,
    DrizzlyToolbarModule,
    HomePageModule
  ],
  declarations: [WeatherInfoPage]
})
export class WeatherInfoPageModule { }
