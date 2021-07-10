import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { WeatherApiPointsInterface } from '../weather-api/weather-api-points-interface';
import { WeatherApiPropertiesInterface } from '../weather-api/weather-api-properties-interface';
import { WeatherApiForecastInterface } from '../weather-api/weather-api-forecast-interface';
import { WeatherApiForecastPropsInterface } from '../weather-api/weather-api-forecast-props-interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text = "hello world";
  userLat: number;
  userLon: number;
  weatherURL = "https://api.weather.gov/points/";
  forecastProperties: WeatherApiForecastPropsInterface;

  constructor(private geolocation: Geolocation, private http: HttpClient) { }

  public getLocation() {
    this.text = "button press";
    this.geolocation.getCurrentPosition().then((resp) => {
      this.text = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      this.userLat = resp.coords.latitude;
      this.userLon = resp.coords.longitude;
      this.getForecastApi(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public getForecastApi(userLat: number, userLon: number) {
    this.http.get(`${this.weatherURL}${userLat.toFixed(4)},${userLon.toFixed(4)}`).toPromise().then((res) => {
      const properties = (res as WeatherApiPointsInterface).properties;
      const forecast = (properties as WeatherApiPropertiesInterface).forecast;
      this.getForecast(forecast);
    }).catch((e) => console.log(e));
  }

  public getForecast(forecastAPI: string) {
    this.http.get(forecastAPI).toPromise().then((res) => {
      this.forecastProperties = ((res as WeatherApiForecastInterface).properties as WeatherApiForecastPropsInterface);
      console.log(this.forecastProperties.periods);
      this.text = this.forecastProperties.periods[0]?.detailedForecast;
    }).catch((e) => console.log(e));
  }

}
