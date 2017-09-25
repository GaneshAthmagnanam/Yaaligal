import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FarmerFullDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farmer-full-details',
  templateUrl: 'farmer-full-details.html',
})
export class FarmerFullDetailsPage {
  farmersProfile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.farmersProfile=this.navParams.get('details');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmerFullDetailsPage');
  }

}
