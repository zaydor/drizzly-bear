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

  getCurrTempRadio() {
    return this.settingsInfoService.getTempUnits();
  }

  getCurrWindRadio() {
    return this.settingsInfoService.getWindUnits();
  }

  radioTempUnitSelect(event) {
    const radioSelection = event.detail.value;
    console.log(`Temp Radio Changed: ${radioSelection}`); // either 'f', 'c', or 'k'

    this.settingsInfoService.setTempUnits(radioSelection, this.data);

  }

  radioWindUnitSelect(event) {
    const radioSelection = event.detail.value;
    console.log(`Wind Radio Changed: ${radioSelection}`); // either 'mph', 'ms', or 'knots'

    this.settingsInfoService.setWindUnits(radioSelection, this.data);

  }

}
