import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContributeFarmersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contribute-farmers',
  templateUrl: 'contribute-farmers.html',
})
export class ContributeFarmersPage {
  mail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.mail=this.navParams.get('email')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributeFarmersPage');
  }

}
