import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the OverallContributorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overall-contributors',
  templateUrl: 'overall-contributors.html',
})
export class OverallContributorsPage {
  contributorsDetails = [];
  filteredArray = [];
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.db.list('/userTransaction').subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        //if(data[i].userEmail)
        //data.
        //this.contributorsDetails.
        this.contributorsDetails.push([data[i].userName, data[i].userImage])

        //this.contributorsDetails.push([data[i].date, data[i].userName, data[i].userImage, data[i].amountPaid])
      }
    })
    //this.contributorsDetails.filter((item, index,) => index > 2 )
    //const uniqueNames = Array.from(new Set(this.contributorsDetails));
    //console.log(uniqueNames);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverallContributorsPage');
  }

}
