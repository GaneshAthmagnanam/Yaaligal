import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the MyTransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-transactions',
  templateUrl: 'my-transactions.html',
})
export class MyTransactionsPage {
  emailId: any;
  transactionDeatils=[];
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.emailId = this.navParams.get('email');
   // alert("1"+this.emailId);
    this.db.list('/userTransaction').subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        if (this.emailId == data[i].userEmail) {
          //console.log(data[i].date+"**"+data[i].benificier+"**"+data[i].userEmail+"**"+data[i].transactionId+"**"+data[i].amountPaid+"**"+data[i].benificierId+"**")
          //alert(data[i].date+"**"+data[i].benificier+"**"+data[i].userEmail+"**"+data[i].transactionId+"**"+data[i].amountPaid+"**"+data[i].benificierId+"**")
          this.transactionDeatils.push([data[i].transactionId,
          data[i].amountPaid,
          data[i].benificierId,
          data[i].date,
          data[i].benificier])
        }
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTransactionsPage');
  }

}
