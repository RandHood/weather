import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
  apiKey = '49f5f1b2aa04f7d7e6436cbe2ed83bfc';
  url;

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  }

  getWeather(city, unit) {
    return this.http.get(this.url + city + '&APPID=' + this.apiKey + '&units=' + unit);
  }

}
