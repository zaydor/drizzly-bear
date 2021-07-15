import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherInfoPage } from './weather-info.page';

const routes: Routes = [
  {
    path: '',
    component: WeatherInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherInfoPageRoutingModule {}
