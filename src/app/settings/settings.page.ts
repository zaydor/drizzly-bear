import { Component, OnInit } from '@angular/core';
import { SettingsInfoService } from '../settings-info.service';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  private data: any;

  constructor(private settingsInfoService: SettingsInfoService, private weatherDataService: WeatherDataService) {
    this.data = this.weatherDataService.getData();
  }

  // ensures settings page has updated data
  ionViewWillEnter() {
    this.data = this.weatherDataService.getData();
    this.settingsInfoService.setCurrPage("settings");
  }

  // initializes the correct radio button
  getCurrTempRadio() {
    return this.settingsInfoService.getTempUnits();
  }

  // initializes the correct radio button
  getCurrWindRadio() {
    return this.settingsInfoService.getWindUnits();
  }

  // fires when you select a new option in the Temperature Units radio group
  radioTempUnitSelect(event) {
    const radioSelection = event.detail.value;
    console.log(`Temp Radio Changed: ${radioSelection}`); // either 'f', 'c', or 'k'

    this.settingsInfoService.setTempUnits(radioSelection, this.data); // having issues with weather data not passing correctly with the service, so I pass as a param

  }

  // fires when you select a new option in the Wind Units radio group
  radioWindUnitSelect(event) {
    const radioSelection = event.detail.value;
    console.log(`Wind Radio Changed: ${radioSelection}`); // either 'mph', 'ms', or 'knots'

    this.settingsInfoService.setWindUnits(radioSelection, this.data); // having issues with weather data not passing correctly with the service, so I pass as a param

  }

}
