import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city: string;
  unit: string;
  cities: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage) {
    this.cities = ['Hong Kong', 'Singapore', 'Bangkok', 'London', 'Macau', 'Kuala Lumpur', 'Shenzhen', 'New York City', 'Antalya', 'Paris', 'Istanbul', 'Rome', 'Dubai', 'Guangzhou', 'Phuket', 'Mecca', 'Pattaya', 'Taipei City', 'Prague', 'Shanghai', 'Las Vegas', 'Miami', 'Barcelona', 'Moscow', 'Beijing', 'Los Angeles', 'Budapest', 'Vienna', 'Amsterdam', 'Sofia', 'Madrid', 'Orlando', 'Ho Chi Minh City', 'Lima', 'Berlin', 'Tokyo', 'Warsaw', 'Chennai', 'Cairo', 'Nairobi', 'Hangzhou', 'Milan', 'San Francisco', 'Buenos Aires', 'Venice', 'Mexico City', 'Dublin', 'Seoul', 'Mugla', 'Mumbai', 'Denpasar', 'Delhi', 'Toronto', 'Zhuhai', 'St Petersburg', 'Burgas', 'Sydney', 'Djerba', 'Munich', 'Johannesburg', 'Cancun', 'Edirne', 'Suzhou', 'Bucharest', 'Punta Cana', 'Agra', 'Jaipur', 'Brussels', 'Nice', 'Chiang Mai', 'Sharm el-Sheikh', 'Lisbon', 'East Province', 'Marrakech', 'Jakarta', 'Manama', 'Hanoi', 'Honolulu', 'Manila', 'Guilin', 'Auckland', 'Siem Reap', 'Sousse', 'Amman', 'Vancouver', 'Abu Dhabi', 'Kiev', 'Doha', 'Florence', 'Rio de Janeiro', 'Melbourne', 'Washington D.C', 'Riyadh', 'Christchurch', 'Frankfurt', 'Baku', 'Sao Paulo', 'Harare', 'Kolkata', 'Nanjing'];
    this.cities = this.cities.sort();
    this.storage.get('settings').then((val) => {
      if (val != null) {
        let settings = JSON.parse(val);
        this.city = settings.city;
        this.unit = settings.unit;
      } else {
        this.city = 'Cairo';
        this.unit = 'metric';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm() {
    let settings = {
      city: this.city,
      unit: this.unit
    };
    this.storage.set('settings', JSON.stringify(settings));
    // this.navCtrl.push(HomePage);
  }

}
