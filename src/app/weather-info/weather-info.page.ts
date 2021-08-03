import { AfterViewInit, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WeatherApiForecastPropsInterface } from '../weather-api/weather-api-forecast-props-interface';
import { WeatherApiPeriodInterface } from '../weather-api/weather-api-period-interface';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.page.html',
  styleUrls: ['./weather-info.page.scss'],
})
export class WeatherInfoPage implements AfterViewInit {
  @Input() forecastProperties: WeatherApiForecastPropsInterface;
  forecast: Object;
  forecastArr: Array<WeatherApiPeriodInterface>;


  constructor(private modalController: ModalController) {
    this.forecastArr = new Array<WeatherApiPeriodInterface>();
  }

  ngAfterViewInit() {
    this.storeForecasts();
    console.log(this.forecastArr);
    this.forecast = this.forecastArr[0].detailedForecast;
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  storeForecasts() {
    const length = this.forecastProperties.periods.length;
    for (let i = 0; i < length; i++) {
      this.forecastArr.push({
        detailedForecast: this.forecastProperties.periods[i].detailedForecast,
        shortForecast: this.forecastProperties.periods[i].shortForecast,
        name: this.forecastProperties.periods[i].name,
        temperature: this.forecastProperties.periods[i].temperature,
        windDirection: this.forecastProperties.periods[i].windDirection,
        windSpeed: this.forecastProperties.periods[i].windSpeed
      });
    }
  }

  /*
    detailedForecast: string, // only used for current forecast
    shortForecast: string, // used for icon
    name: string, // used to tell the time of day for forecast
    temperature: number,
    windDirection: string, // only used for current forecast
    windSpeed: string // only used for current forecast
  */

}
