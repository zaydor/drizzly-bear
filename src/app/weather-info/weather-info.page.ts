import { AfterViewInit, Component } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.page.html',
  styleUrls: ['./weather-info.page.scss'],
})
export class WeatherInfoPage {
  forecast: Object;
  data: any;

  constructor(private weatherDataService: WeatherDataService) {
    this.data = this.weatherDataService.getData();
    console.log(this.data);
  }
  // storeForecasts() {
  //   const length = this.forecastProperties.periods.length;
  //   for (let i = 0; i < length; i++) {
  //     this.forecastArr.push({
  //       detailedForecast: this.forecastProperties.periods[i].detailedForecast,
  //       shortForecast: this.forecastProperties.periods[i].shortForecast,
  //       name: this.forecastProperties.periods[i].name,
  //       temperature: this.forecastProperties.periods[i].temperature,
  //       windDirection: this.forecastProperties.periods[i].windDirection,
  //       windSpeed: this.forecastProperties.periods[i].windSpeed
  //     });
  //   }
}

/*
  detailedForecast: string, // only used for current forecast
  shortForecast: string, // used for icon
  name: string, // used to tell the time of day for forecast
  temperature: number,
  windDirection: string, // only used for current forecast
  windSpeed: string // only used for current forecast
*/
