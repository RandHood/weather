import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  _weather: any;
  location: {
    city: string
  };
  unit: string;
  degree: string;
  // apiKey = '49f5f1b2aa04f7d7e6436cbe2ed83bfc';
  // url = 'http://api.openweathermap.org/data/2.5/weather?q=';

  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider,
              private http: HttpClient, private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get('location').then((val) => {
      if (val != null) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Cairo'
        };
      }
      this.unit = 'metric';
      this.degree = 'C';

      this.weatherProvider.getWeather(this.location.city, this.unit)
        .subscribe(weather => {
          this._weather = weather;
          let iconCode = this._weather.weather[0].icon;
          let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          this.weather = {
            location: this._weather.name + ', ' + this._weather.sys.country,
            temperature: this._weather.main.temp,
            humidity: this._weather.main.humidity,
            pressure: this._weather.main.pressure,
            wind: this._weather.wind.speed,
            clouds: this._weather.clouds.all,
            visibility: this._weather.visibility,
            description: this._weather.weather[0].description,
            icon: iconUrl
          };
          console.log(this.weather);
        });

    });


    // return this.http.get(this.url + '&APPID=' + this.apiKey)
    // .subscribe(weather => {
    //   console.log(weather);
    // });
  }

}
