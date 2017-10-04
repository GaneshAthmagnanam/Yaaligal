import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the ContributorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contributors',
  templateUrl: 'contributors.html',
})
export class ContributorsPage {
  transactionDetails = [];
  farmerIdValue: any;
  loggedUserInfo: any;
  method: number;
  constructor(public db: AngularFireDatabase, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.farmerIdValue = this.navParams.get('farmerIdentifier')
    this.loggedUserInfo = this.navParams.get('user')
    this.method = this.navParams.get('method')
    console.log("farmer id is **** " + this.navParams.get('farmerIdentifier'));
    this.db.list('/userTransaction').subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        if (this.farmerIdValue == data[i].benificierId) {
          this.transactionDetails.push([data[i].date, data[i].userName, data[i].userImage, data[i].amountPaid])
          //data[i].userEmail
        }
      }
      //this.transactionDetails=data;

    })
    console.log(this.transactionDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributorsPage');
  }
  dismissView() {
    this.viewCtrl.dismiss({ mailId: this.loggedUserInfo, method: this.method });
    //this.navCtrl.setRoot('FarmerDetailsPage',{mailId:this.loggedUserInfo,method:this.method})
  }

}
