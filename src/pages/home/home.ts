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
  location: {
    city: string,
    country: string
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
        .subscribe(_weather => {
          // let _weather = weather;
          let iconCode = _weather.weather[0].icon;
          let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          this.weather = {
            location: _weather.name + ', ' + _weather.sys.country,
            temperature: _weather.main.temp,
            humidity: _weather.main.humidity,
            pressure: _weather.main.pressure,
            wind: _weather.wind.speed,
            clouds: _weather.clouds.all,
            visibility: _weather.visibility,
            description: _weather.weather[0].description,
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
