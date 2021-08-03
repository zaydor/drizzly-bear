import { Component, Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { WeatherApiPointsInterface } from '../weather-api/weather-api-points-interface';
import { WeatherApiPropertiesInterface } from '../weather-api/weather-api-properties-interface';
import { WeatherApiForecastInterface } from '../weather-api/weather-api-forecast-interface';
import { WeatherApiForecastPropsInterface } from '../weather-api/weather-api-forecast-props-interface';
import { WeatherApiLocationPropsInterface } from '../weather-api/weather-api-location-props-interface';
import { BingMapsKey } from '../bing-maps-key';
import { DrizzlyToolbarComponent } from '../drizzly-toolbar/drizzly-toolbar.component';
import { ModalController } from '@ionic/angular';
import { WeatherInfoPage } from '../weather-info/weather-info.page';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text = "Pull to get the weather";
  locationText = "";
  userLat: number;
  userLon: number;
  userCity: string;
  userState: string;
  weatherURL = "https://api.weather.gov/points/";
  weatherURL2 = "";
  forecastProperties: WeatherApiForecastPropsInterface;
  bingMapKey: BingMapsKey;
  modalController: any;

  constructor(private geolocation: Geolocation, private http: HttpClient, modalController: ModalController, private weatherDataService: WeatherDataService) {
    // this.getMapLoc();
    this.modalController = modalController;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: WeatherInfoPage,
      componentProps: {
        'forecastProperties': this.forecastProperties
      }
    });
    return await modal.present();
  }

  public getMapLoc() {
    // this.http.get
  }

  public getLocation(event?) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.text = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      this.userLat = resp.coords.latitude;
      this.userLon = resp.coords.longitude;
      if (event) {
        this.getForecastApi(resp.coords.latitude, resp.coords.longitude, event);
      } else {
        this.getForecastApi(resp.coords.latitude, resp.coords.longitude);
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public getForecastApi(userLat: number, userLon: number, event?) {
    this.http.get(`${this.weatherURL}${userLat.toFixed(4)},${userLon.toFixed(4)}`).toPromise().then((res) => {
      console.log(res);
      const properties = (res as WeatherApiPointsInterface).properties;
      const location = ((properties as WeatherApiPropertiesInterface).relativeLocation as WeatherApiLocationPropsInterface).properties;
      console.log(location);
      this.userCity = (location as WeatherApiLocationPropsInterface).city;
      this.userState = (location as WeatherApiLocationPropsInterface).state;
      const forecast = (properties as WeatherApiPropertiesInterface).forecast;
      if (event) {
        this.getForecast(forecast, event);
      } else {
        this.getForecast(forecast);
      }

    }).catch((e) => console.log(e));
  }

  public getForecast(forecastAPI: string, event?) {
    this.http.get(forecastAPI).toPromise().then((res) => {
      if (event) {
        event.target.complete();
      }
      this.forecastProperties = ((res as WeatherApiForecastInterface).properties as WeatherApiForecastPropsInterface);
      console.log(this.forecastProperties.periods);
      this.weatherDataService.setData(this.forecastProperties.periods);
      this.text = `${this.forecastProperties.periods[0]?.temperature}\xB0F`;
      this.locationText = `${this.userCity}, ${this.userState}`;
    }).catch((e) => console.log(e));
  }
}
