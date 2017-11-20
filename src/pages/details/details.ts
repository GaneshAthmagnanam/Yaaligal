import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../home/home';
import firebase from 'firebase';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  index: any;
  errorMsg: any;
  usertransactionId: number = 1111111111111;
  loginMethod: number;
  dataValue: any = [];
  age: any;
  farmerId: any;
  amount: number;
  newAmount: number;
  uamount: number;
  name: any;
  uDetails: any;
  contributionCount: number;
  usersDetails = [];
  dateWithTimeStamp: any;
  dateAlone: any;
  currentDate:any;
  monthAlone: any;
  yearAlone: any;
  hours:any;
  sfID: any
  fbdataDetails: any;
  minutesAlone: any;
  secondsAlone: any;
  milliSeconds: any;
  loggedinName: any;
  loggedinImage: any;
  loggedinEmail: any;
  pendingmonths: any;
  constructor(public googleplus: GooglePlus, private fb: Facebook, private fireauth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    //this.fetchTransactionId();
    this.currentDate=new Date();
    this.dateAlone = this.currentDate.getDate();
    this.monthAlone = this.currentDate.getMonth()+1;
    this.yearAlone = this.currentDate.getFullYear();
    this.hours= this.currentDate.getHours();
    this.minutesAlone = this.currentDate.getMinutes();
    this.secondsAlone = this.currentDate.getSeconds();
    //this.milliSeconds = this.currentDate.getMilliseconds();
    //console.log(new Date().getTime()+"***"+new Date().getTimezoneOffset()+"***"+new Date().getUTCDate());
    this.dateWithTimeStamp = this.dateAlone + "-" + this.monthAlone + "-" + this.yearAlone + " " + this.hours + ":" + this.minutesAlone + ":" + this.secondsAlone;
    console.log("My date is " + this.dateWithTimeStamp);
    
    this.fbdataDetails = this.navParams.get('fbdataDetails');
    this.loginMethod = this.navParams.get('lMethod');
    this.sfID = this.navParams.get('itemValue');
    //if(3==this.loginMethod){
    this.loggedinImage = this.navParams.get('image');
    this.loggedinEmail = this.navParams.get('email');
    this.loggedinName = this.navParams.get('name');
    //alert("in details page"+this.loginMethod+"**"+this.index+"**"+this.loggedinImage+"**"+this.loggedinEmail+"**"+this.loggedinName);
    console.log("in details page" + this.loginMethod + "**" + this.sfID + "**" + this.loggedinImage + "**" + this.loggedinEmail + "**" + this.loggedinName)

    this.show(this.sfID);
  }

  show(value) {
    
    this.db.list('/Farmerdetails').subscribe(data => {
      //this.dataValue=data[value];
      for (var i = 0; i < data.length; i++) {
        if (value == data[i].uid) {
          this.age = data[i].age;
          this.amount = data[i].loanamount;
          this.name = data[i].name;
          this.pendingmonths = data[i].pendingmonths;
          this.farmerId = data[i].uid;
          this.contributionCount = data[i].contributedcount;
          this.index = i;
        }

      }
    })
  }
  logout() {
    console.log("logout");
    if (this.loginMethod == 1) {
      this.fireauth.auth.signOut()
        .then(succ => {
          //console.log("logged out from my email");
          this.navCtrl.setRoot(HomePage);
        })
        .catch(err => {
          alert("failed");
        })
    }
    if (this.loginMethod == 2) {
      this.googleplus.logout()
        .then((response) => {
          console.log("logged out from fb");
          this.navCtrl.setRoot(HomePage);
        }, (error) => {
          alert(error);
        })
    }
    if (this.loginMethod == 3) {
      this.fb.logout()
        .then((response) => {
          console.log("logged out from fb");
          this.navCtrl.setRoot(HomePage);
        }, (error) => {
          alert(error);
        })
    }

  }
  fetchTransactionId() {
    if (this.db.list('/userTransaction')) {
      //alert("went inside");
      this.db.list('/userTransaction').subscribe(data => {
        //console.log("1"+data);

        this.usertransactionId = data[data.length - 1].transactionId + 1;
        //alert(this.usertransactionId);
        //console.log("2"+"*****"+data[data.length-1].transactionId);
      })
    }
  }
  transaction() {

    this.db.list('/userTransaction').push({
      transactionId: this.usertransactionId,
      userEmail: this.loggedinEmail,
      userImage: this.loggedinImage,
      benificier: this.name,
      benificierId: this.farmerId,
      amountPaid: this.uamount,
      userName: this.loggedinName,
      date: this.dateWithTimeStamp
    })
  }

  pay() {
    //console.log("before"+this.usersDetails);

    //this.usersDetails.
    //this.usersDetails.push(this.loggedinName,this.loggedinEmail,this.loggedinImage);
    //console.log("after"+this.usersDetails)
    if (this.uamount && this.uamount > 0) {
      this.transaction();
      this.newAmount = this.amount - this.uamount;
      this.contributionCount += 1;
      var res = this.db.list('/Farmerdetails/' + this.index);
      try {
        firebase.database().ref('Farmerdetails/' + this.index).set({
          loanamount: this.newAmount,
          name: this.name,
          age: this.age,
          pendingmonths: this.pendingmonths,
          contributedcount: this.contributionCount,
          uid: this.farmerId
        }).then(succ => {
          // alert("1"+this.loggedinEmail+this.loginMethod)
          if (1 == this.loginMethod) {
            this.navCtrl.setRoot('FarmerDetailsPage', { method: this.loginMethod, mailId: this.loggedinEmail });
          }
          else if (3 == this.loginMethod || 2 == this.loginMethod) {
            this.navCtrl.setRoot('FarmerDetailsPage', { data: this.fbdataDetails, method: this.loginMethod });

          }

        }).catch(error => {
          //alert("2"+error);
          this.errorMsg = error['message'];
          console.log("Transaction error" + error);
        })

      }
      catch (error) {
        this.errorMsg = "Kindly specify valid amount in rupees";
        console.log("Transaction error" + error);
      }
    }
    else {
      this.errorMsg = "Kindly specify valid amount in rupees";
    }
  }

}
