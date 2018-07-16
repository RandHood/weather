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
  settings: {
    city: string
    unit: string;
  };
  degree: string;

  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider,
              private http: HttpClient, private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get('settings').then((val) => {
      if (val != null) {
        this.settings = JSON.parse(val);
      } else {
        this.settings = {
          city: 'Cairo',
          unit: 'metric'
        };
      }
      if (this.settings.unit === 'metric') {
        this.degree = 'C';
      } else {
        this.degree = 'F';
      }
        
      this.weatherProvider.getWeather(this.settings.city, this.settings.unit)
        .subscribe(weather => {
          this._weather = weather;
          let iconCode = this._weather.weather[0].icon;
          let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          this.weather = {
            location: this._weather.name + ', ' + this._weather.sys.country,
            temperature: Math.round(this._weather.main.temp),
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
  }
}
