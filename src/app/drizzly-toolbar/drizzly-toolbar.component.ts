import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsInfoService } from '../settings-info.service';

// TODO: Add comments and create a solid README. Then prep for upload to google play store.

@Component({
  selector: 'app-drizzly-toolbar',
  templateUrl: './drizzly-toolbar.component.html',
  styleUrls: ['./drizzly-toolbar.component.scss'],
})
export class DrizzlyToolbarComponent implements AfterContentChecked {
  data: string;
  public isDataAvail: boolean = false;

  constructor(private settingsInfoService: SettingsInfoService, private router?: Router) { }

  // ensures weather data does not exist to disable appropriate buttons
  ngAfterContentChecked(): void {
    if (!this.settingsInfoService.isDataAvailable) {
      this.isDataAvail = false;
    } else {
      this.isDataAvail = true;
    }
  }

  // checks if weather data exists
  isDataAvailable() {
    return this.isDataAvail;
  }

  // changes color of disabled button for better visability
  isDataAvailableColorer() {
    if (this.isDataAvail) {
      return "primary";
    } else {
      return "warning";
    }
  }

  // checks if user is on settings page
  settingsPageCheck() {
    if (this.settingsInfoService.getCurrPage() === "settings") {
      return "settings";
    } else {
      return "settings-outline";
    }
  }

  // checks if user is on home page
  homePageCheck() {
    if (this.settingsInfoService.getCurrPage() === "home") {
      return "home";
    } else {
      return "home-outline";
    }
  }

  // checks if user is on forecast page
  forecastPageCheck() {
    if (this.settingsInfoService.getCurrPage() === "forecasts") {
      return "sunny";
    } else {
      return "sunny-outline";
    }
  }

  // navigate to forecast page
  goToWeatherInfoPage() {
    console.log("weather info page");
    this.router.navigate(['weather-info']);
  }

  // navigate to home page
  goToHomePage() {
    console.log("home page");
    this.router.navigate(['home']);
  }

  // navigate to settings page
  goToSettingsPage() {
    console.log("settings page");
    this.router.navigate(['settings']);
  }

}
