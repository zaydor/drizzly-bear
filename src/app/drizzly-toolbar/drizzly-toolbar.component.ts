import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsInfoService } from '../settings-info.service';

@Component({
  selector: 'app-drizzly-toolbar',
  templateUrl: './drizzly-toolbar.component.html',
  styleUrls: ['./drizzly-toolbar.component.scss'],
})
export class DrizzlyToolbarComponent implements AfterContentChecked {
  data: string;
  public isDataAvail: boolean = false;

  constructor(private settingsInfoService: SettingsInfoService, private router?: Router) { }
  ngAfterContentChecked(): void {
    if (!this.settingsInfoService.isDataAvailable) {
      this.isDataAvail = false;
    } else {
      this.isDataAvail = true;
    }
  }

  isDataAvailable() {
    return this.isDataAvail;
  }

  isDataAvailableColorer() {
    if (this.isDataAvail) {
      return "primary";
    } else {
      return "warning";
    }
  }


  settingsPageCheck() {
    if (this.settingsInfoService.getCurrPage() === "settings") {
      return "settings";
    } else {
      return "settings-outline";
    }
  }

  homePageCheck() {
    if (this.settingsInfoService.getCurrPage() === "home") {
      return "home";
    } else {
      return "home-outline";
    }
  }

  forecastPageCheck() {
    if (this.settingsInfoService.getCurrPage() === "forecasts") {
      return "sunny";
    } else {
      return "sunny-outline";
    }
  }

  goToWeatherInfoPage() {
    console.log("weather info page");
    this.router.navigate(['weather-info']);
  }

  goToHomePage() {
    console.log("home page");
    this.router.navigate(['home']);
  }

  goToSettingsPage() {
    console.log("settings page");
    this.router.navigate(['settings']);
  }

}
