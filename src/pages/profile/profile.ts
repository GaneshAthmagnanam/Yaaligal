import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name:any;
  image:any;
  emailId:any;
  method:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.name=this.navParams.get('name');
      this.image=this.navParams.get('image');
      this.emailId=this.navParams.get('email');
      this.method=this.navParams.get('method');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
