import { Injectable } from '@angular/core';
import { WeatherDataService } from './weather-data.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsInfoService {

  private data: any;

  constructor(private weatherDataService: WeatherDataService) {
    this.data = weatherDataService.getData();
  }

  private tempUnits: string = 'f';
  private windUnits: string = 'mph';
  private currPage: string = 'home'; // either 'home', 'settings', or 'forecasts'

  public getTempUnits(): string {
    return this.tempUnits;
  }

  public setTempUnits(unit, dataBackup): void {
    if (this.data == undefined) {
      this.data = dataBackup;
    }
    this.convertTemp(unit);
    this.tempUnits = unit;
  }

  public getWindUnits(): string {
    return this.windUnits;
  }

  public setWindUnits(unit, dataBackup): void {
    if (this.data == undefined) {
      this.data = dataBackup;
    }
    this.convertWind(unit);
    this.windUnits = unit;
  }

  public getCurrPage(): string {
    return this.currPage;
  }

  public setCurrPage(page): void {
    this.currPage = page;
  }

  public convertTemp(newUnit: string): void {
    const length = this.data.length;
    if (this.tempUnits === 'f') { // originally fahrenheit
      if (newUnit === 'c') { // changing to celsius
        for (let i = 0; i < length; i++) {
          this.data[i].temperature = ((parseInt(this.data[i].temperature) - 32) / 1.8).toFixed(0).toString();
        }

      } else { // changing to kelvin
        for (let i = 0; i < length; i++) {
          this.data[i].temperature = (((parseInt(this.data[i].temperature) - 32) / 1.8) + 273).toFixed(0).toString();
        }
      }

    } else if (this.tempUnits === 'c') // originally celsius
    {
      if (newUnit === 'f') { // changing to fahrenheit
        for (let i = 0; i < length; i++) {
          this.data[i].temperature = ((parseInt(this.data[i].temperature) * 1.8) + 32).toFixed(0).toString();
        }
      } else { // changing to kelvin
        for (let i = 0; i < length; i++) {
          this.data[i].temperature = (parseInt(this.data[i].temperature) + 273).toFixed(0).toString();
        }
      }
    } else { // originally kelvin
      if (newUnit === 'f') { // changing to fahrenheit
        for (let i = 0; i < length; i++) {
          this.data[i].temperature = (((parseInt(this.data[i].temperature) - 273) * 1.8) + 32).toFixed(0).toString();
        }
      } else { // changing to celsius
        for (let i = 0; i < length; i++) {
          this.data[i].temperature = (parseInt(this.data[i].temperature) - 273).toFixed(0).toString();
        }

      }
    }

  }

  private convertWind(newUnit: string) {
    const length = this.data.length;
    if (this.windUnits === 'mph') { // was miles per hour
      if (newUnit === 'ms') { //  mph -> ms
        for (let i = 0; i < length; i++) {
          let windArr = [];
          windArr.push(this.data[i].windSpeed.split(/[ ,]+/)); // '0 to 10 mph' -> ['0', 'to', '10', 'mph']
          windArr[0][0] = (parseInt(windArr[0][0]) * 0.44704).toFixed(0).toString();
          windArr[0][2] = (parseInt(windArr[0][2]) * 0.44704).toFixed(0).toString();
          windArr[0][3] = 'ms';
          this.data[i].windSpeed = `${windArr[0][0]} to ${windArr[0][2]} ${windArr[0][3]}`;
        }
      } else { // mph -> knots
        for (let i = 0; i < length; i++) {
          let windArr = [];
          windArr.push(this.data[i].windSpeed.split(/[ ,]+/)); // '0 to 10 mph' -> ['0', 'to', '10', 'mph']
          windArr[0][0] = (parseInt(windArr[0][0]) * 0.8).toFixed(0).toString();
          windArr[0][2] = (parseInt(windArr[0][2]) * 0.8).toFixed(0).toString();
          windArr[0][3] = 'knots';
          this.data[i].windSpeed = `${windArr[0][0]} to ${windArr[0][2]} ${windArr[0][3]}`;
        }

      }
    } else if (this.windUnits === 'ms') { // was meters per second
      if (newUnit === 'mph') { // ms -> mph
        for (let i = 0; i < length; i++) {
          let windArr = [];
          windArr.push(this.data[i].windSpeed.split(/[ ,]+/)); // '0 to 10 mph' -> ['0', 'to', '10', 'mph']
          windArr[0][0] = (parseInt(windArr[0][0]) * 2.38).toFixed(0).toString();
          windArr[0][2] = (parseInt(windArr[0][2]) * 2.38).toFixed(0).toString();
          windArr[0][3] = 'mph';
          this.data[i].windSpeed = `${windArr[0][0]} to ${windArr[0][2]} ${windArr[0][3]}`;
        }
      } else { // ms -> knots
        for (let i = 0; i < length; i++) {
          let windArr = [];
          windArr.push(this.data[i].windSpeed.split(/[ ,]+/)); // '0 to 10 mph' -> ['0', 'to', '10', 'mph']
          windArr[0][0] = (parseInt(windArr[0][0]) * 1.9438445).toFixed(0).toString();
          windArr[0][2] = (parseInt(windArr[0][2]) * 1.9438445).toFixed(0).toString();
          windArr[0][3] = 'knots';
          this.data[i].windSpeed = `${windArr[0][0]} to ${windArr[0][2]} ${windArr[0][3]}`;
        }
      }
    } else { // was knots
      if (newUnit === 'mph') { // knots -> mph
        for (let i = 0; i < length; i++) {
          let windArr = [];
          windArr.push(this.data[i].windSpeed.split(/[ ,]+/)); // '0 to 10 mph' -> ['0', 'to', '10', 'mph']
          windArr[0][0] = (parseInt(windArr[0][0]) * 1.2).toFixed(0).toString();
          windArr[0][2] = (parseInt(windArr[0][2]) * 1.2).toFixed(0).toString();
          windArr[0][3] = 'mph';
          this.data[i].windSpeed = `${windArr[0][0]} to ${windArr[0][2]} ${windArr[0][3]}`;
        }
      } else { // knots -> ms
        for (let i = 0; i < length; i++) {
          let windArr = [];
          windArr.push(this.data[i].windSpeed.split(/[ ,]+/)); // '0 to 10 mph' -> ['0', 'to', '10', 'mph']
          windArr[0][0] = (parseInt(windArr[0][0]) * 0.5144444).toFixed(0).toString();
          windArr[0][2] = (parseInt(windArr[0][2]) * 0.5144444).toFixed(0).toString();
          windArr[0][3] = 'ms';
          this.data[i].windSpeed = `${windArr[0][0]} to ${windArr[0][2]} ${windArr[0][3]}`;
        }
      }

    }
  }
}
