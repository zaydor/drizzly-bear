import { Component } from '@angular/core';
import { SettingsInfoService } from '../settings-info.service';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.page.html',
  styleUrls: ['./weather-info.page.scss'],
})
export class WeatherInfoPage {
  forecastArr: {
    detailedForecast: string,
    shortForecast: string,
    name: string,
    temperature: number,
    windDirection: string,
    windSpeed: string
  }[] = [];
  data: any;
  currForecast: string;
  currWind: string;

  tempUnit: string;
  windUnit: string;

  constructor(private weatherDataService: WeatherDataService, private settingsInfoService: SettingsInfoService) {
    this.data = this.weatherDataService.getData(); // get weather data from service

    this.settingsInfoService.setCurrPage("forecasts");
    this.tempUnit = this.settingsInfoService.getTempUnits();
    this.windUnit = this.settingsInfoService.getWindUnits();

    this.storeForecasts(this.data); // store forecasts into an array

  }

  // ensures forecast page has updated data
  ionViewWillEnter() {
    this.data = this.weatherDataService.getData(); // get weather data from service

    this.settingsInfoService.setCurrPage("forecasts");
    this.tempUnit = this.settingsInfoService.getTempUnits();
    this.windUnit = this.settingsInfoService.getWindUnits();

    this.forecastArr = [];

    this.storeForecasts(this.data); // store forecasts into an array
  }

  // stores the weather data into an array of objects
  private storeForecasts(forecasts) {
    const length = forecasts.length;
    for (let i = 0; i < length; i++) {
      this.forecastArr.push({
        detailedForecast: forecasts[i].detailedForecast,
        shortForecast: forecasts[i].shortForecast,
        name: forecasts[i].name,
        temperature: forecasts[i].temperature,
        windDirection: forecasts[i].windDirection,
        windSpeed: forecasts[i].windSpeed
      });
    }

    this.currForecast = this.forecastArr[0].detailedForecast;
  }

  // gets the temp units
  public getTempUnit() {
    return this.settingsInfoService.getTempUnits().toUpperCase();
  }


}
