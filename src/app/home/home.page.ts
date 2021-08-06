import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { WeatherApiPointsInterface } from '../weather-api/weather-api-points-interface';
import { WeatherApiPropertiesInterface } from '../weather-api/weather-api-properties-interface';
import { WeatherApiForecastInterface } from '../weather-api/weather-api-forecast-interface';
import { WeatherApiForecastPropsInterface } from '../weather-api/weather-api-forecast-props-interface';
import { WeatherApiLocationPropsInterface } from '../weather-api/weather-api-location-props-interface';
import { BingMapsKey } from '../bing-maps-key';
import { WeatherDataService } from '../weather-data.service';
import { SettingsInfoService } from '../settings-info.service';

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
  private data: any;

  constructor(private geolocation: Geolocation, private http: HttpClient, private weatherDataService: WeatherDataService, private settingsInfoService: SettingsInfoService) {
    // this.getMapLoc();
    this.data = this.weatherDataService.getData();
    if (this.data == undefined) {
      this.settingsInfoService.isDataAvailable = false;
    } else {
      this.settingsInfoService.isDataAvailable = true;
    }

  }

  // ensures page has updated data
  ionViewWillEnter() {
    this.data = this.weatherDataService.getData();
    this.settingsInfoService.setCurrPage("home");
    if (this.data == undefined) {
      console.log('data is undefined');
    } else {
      console.log('data is defined');
      console.log(this.data[0]);
      this.text = `${this.data[0].temperature}\xB0${this.settingsInfoService.getTempUnits().toUpperCase()}`;
    }
  }

  // --- unfinished ---
  // in a new update, add a feature to change location to get weather from
  // this function will be where the api call for that exists
  public getMapLoc() {
    // this.http.get
  }

  // api call to get the users current location
  public getLocation(event?) {
    this.text = "";
    this.geolocation.getCurrentPosition().then((resp) => {
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

  // api call to get the forecast of the users current location
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

  // parse through the returned weather data
  public getForecast(forecastAPI: string, event?) {
    this.http.get(forecastAPI).toPromise().then((res) => {
      if (event) {
        event.target.complete(); // finishes the refreshing animation
      }
      this.forecastProperties = ((res as WeatherApiForecastInterface).properties as WeatherApiForecastPropsInterface);
      console.log(this.forecastProperties.periods);
      this.weatherDataService.setData(this.forecastProperties.periods);
      this.text = `${this.forecastProperties.periods[0]?.temperature}\xB0${this.settingsInfoService.getTempUnits().toUpperCase()}`;
      this.locationText = `${this.userCity}, ${this.userState}`;
      this.settingsInfoService.isDataAvailable = true;
    }).catch((e) => console.log(e));
  }
}
