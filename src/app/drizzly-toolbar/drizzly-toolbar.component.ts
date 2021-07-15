import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drizzly-toolbar',
  templateUrl: './drizzly-toolbar.component.html',
  styleUrls: ['./drizzly-toolbar.component.scss'],
})
export class DrizzlyToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

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
